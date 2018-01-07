import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoundsService } from '../shared/services/rounds.service';
import { Subscription } from 'rxjs/Subscription';
import { GolfRound } from '../shared/models/golf-round.class';

@Component({
    selector: 'golf-round-list',
    templateUrl: './round-list.component.html',
    styleUrls: ['./round-list.component.scss']
})
export class RoundListComponent implements OnInit, OnDestroy {

    private dataSubscription: Subscription = null;

    public readonly rounds: GolfRound[];
    public selectedRound: GolfRound;

    constructor(private _roundsService: RoundsService) {
        this.rounds = this._roundsService.rounds;
    }

    ngOnInit() {
        this.dataSubscription = this._roundsService.roundChanges.subscribe();
    }

    ngOnDestroy() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
            this.dataSubscription = null;
        }
    }

    public selectRound(round: GolfRound) {
        this.selectedRound = round;
    }

}
