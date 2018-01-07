import { Injectable } from '@angular/core';
import { GolfRound } from '../models/golf-round.class';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { IGolfRound } from '../models/golf-round.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoundsService {

    private _roundsCollection: AngularFirestoreCollection<IGolfRound>;
    public roundChanges: Observable<{index, operation}[]>;

    private _rounds: GolfRound[];
    get rounds(): GolfRound[] { return this._rounds; }

    constructor(private fireDb: AngularFirestore) {
        this._rounds = [];
        this._roundsCollection = fireDb.collection('rounds');

        this.roundChanges = this._roundsCollection.stateChanges().map((roundData) => {

            const changes = [];

            roundData.forEach((item: DocumentChangeAction) => {
                const data: IGolfRound = item.payload.doc.data() as IGolfRound;
                const refId: string = item.payload.doc.id;

                let index = this._rounds.findIndex((round) => {
                    return (round.Id === refId);
                });

                if (item.type === 'removed') {
                    if (index >= 0) {
                        this._rounds.splice(index, 1);
                    }
                } else if (index >= 0) {
                    this._rounds[index] = new GolfRound(refId, data);
                } else {
                    index = this._rounds.length;
                    this._rounds.push(new GolfRound(refId, data));
                }
                
                changes.push({index: index, operation: item.type});
            });

            return changes;
        });
    }

    public saveRound(round: GolfRound) {
        if (round.Id) {
            this._roundsCollection.doc(round.Id).update(round.asIGolfRound);
        } else {
            this._roundsCollection.add(round.asIGolfRound());
        }
    }
}
