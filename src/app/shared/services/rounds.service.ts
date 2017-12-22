import { Injectable } from '@angular/core';
import { GolfRound } from '../models/golf-round.class';

@Injectable()
export class RoundsService {
    private _rounds: GolfRound[];
    get rounds(): GolfRound[] { return this._rounds; }

    constructor() {
        this.addRound(new GolfRound(new Date(2017, 4, 1, 13, 0), 'Hurstbourne CC', 63.27, true, false));
        this.addRound(new GolfRound(new Date(2017, 1, 1, 12, 0), 'Glen Oaks', 42.5, true, true, 18));
        this.addRound(new GolfRound(new Date(2017, 8, 1, 8, 0), 'Persimmon Ridge', 0));
    }

    public addRound(newRound: GolfRound) {
        if (this._rounds.length === 0) {
            this._rounds.push(newRound);
        } else {
            const insertAt = this._rounds.findIndex((round) => round.date > newRound.date) - 1;
            this._rounds.splice(insertAt > -1 ? insertAt : 0, 0, newRound);
        }
    }
}
