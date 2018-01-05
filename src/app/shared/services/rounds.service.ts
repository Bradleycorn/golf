import { Injectable } from '@angular/core';
import { GolfRound } from '../models/golf-round.class';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { IGolfRound } from '../models/golf-round.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoundsService {

    private _roundsCollection: AngularFirestoreCollection<IGolfRound>;
    public roundChanges: Observable<boolean>;

    private _rounds: GolfRound[];
    get rounds(): GolfRound[] { return this._rounds; }

    constructor(fireDb: AngularFirestore) {
        this._rounds = [];
        this._roundsCollection = fireDb.collection('rounds');

        this.roundChanges = this._roundsCollection.stateChanges().map((roundData) => {

            const debug = true;

            roundData.forEach((item: DocumentChangeAction) => {
                const data: IGolfRound = item.payload.doc.data() as IGolfRound;
                const refId: string = item.payload.doc.id;

                switch (item.type) {
                    case 'added':
                        this._rounds.push(new GolfRound(refId, data));
                        break;
                    case 'removed':
                        // TODO: Find round in list and delete it.
                    case 'modified':
                        // TODO: Find round in list and replace it.
                }
            });

            return true;
        });
    }

    public addRound(newRound: GolfRound) {
        this._roundsCollection.add(newRound.asIGolfRound());
    }
}
