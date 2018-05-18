import { Injectable } from '@angular/core';
import { GolfRound } from '../models/golf-round.class';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { IGolfRound } from '../models/golf-round.interface';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


export interface IRoundChange {
    round: GolfRound;
    changeType: firebase.firestore.DocumentChangeType;
    newIndex: number;
    oldIndex: number;
}


@Injectable()
export class RoundsService {

    private _roundsCollection: AngularFirestoreCollection<IGolfRound>;
    public roundChanges: Observable<IRoundChange[]>;

    private _rounds: GolfRound[];
    get rounds(): GolfRound[] { return this._rounds; }

    private _selectedRound: GolfRound;
    public get selectedRound(): GolfRound {
        return this._selectedRound;
    }

    constructor(private fireDb: AngularFirestore) {
        this._rounds = [];
        this._selectedRound = null;
        this._roundsCollection = fireDb.collection('rounds', ref => ref.orderBy('date', 'desc'));

        this.roundChanges = this._roundsCollection.stateChanges().map((roundData) => {

            const changes = [];

            roundData.forEach((item: DocumentChangeAction) => {
                const data: IGolfRound = item.payload.doc.data() as IGolfRound;
                const refId: string = item.payload.doc.id;
                const round: GolfRound = new GolfRound(refId, data);
                const changeType: string = item.type;
                const newIndex: number = item.payload.newIndex;
                const oldIndex: number = item.payload.oldIndex;

                changes.push({round: round, changeType: changeType, newIndex: newIndex, oldIndex: oldIndex});
/*

                console.info(`id: ${refId} ${item.type}. newIndex: ${item.payload.newIndex}. oldIndex: ${item.payload.oldIndex}`);

                changes.push({index: item.payload.newIndex, operation: item.type});
*/
            });

            return changes;
        });
    }

    public saveRound(round: GolfRound) {
        if (round.Id) {
            this._roundsCollection.doc(round.Id).update(round.asIGolfRound());
        } else {
            this._roundsCollection.add(round.asIGolfRound());
        }
    }

    public selectRound(round: GolfRound | number) {
        if (round === null || round === undefined) {
            this._selectedRound = null;
        } else if (isNaN(round as number)) {
            this._selectedRound = round as GolfRound;
        } else if (round > 0 && round < this._rounds.length) {
            this._selectedRound = this._rounds[round as number];
        }
    }
}
