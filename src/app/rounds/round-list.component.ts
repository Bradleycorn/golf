import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRoundChange, RoundsService } from '../shared/services/rounds.service';
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
    public get selectedRound(): GolfRound {
        return this._roundsService.selectedRound;
    }

    constructor(private _roundsService: RoundsService) {
        this.rounds = [];
    }

    ngOnInit() {
        this.dataSubscription = this._roundsService.roundChanges.subscribe((changes: IRoundChange[]) => {
            this.onRoundChanges(changes);
        });
    }

    ngOnDestroy() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
            this.dataSubscription = null;
        }
    }

    private onRoundChanges(changes: IRoundChange[]) {
        changes.forEach((changedRound: IRoundChange) => {

            if (changedRound.changeType === 'removed') {
                this.rounds.splice(changedRound.oldIndex, 1);
            } else if (changedRound.changeType === 'modified') {
                if (changedRound.newIndex !== changedRound.oldIndex) {
                    this.rounds.splice(changedRound.oldIndex, 1);
                    this.rounds.splice(changedRound.newIndex, 0, changedRound.round);
                } else {
                    this.rounds[changedRound.newIndex] = changedRound.round;
                }
            } else {
                this.rounds.splice(changedRound.newIndex, 0, changedRound.round);
            }
        });
    }

    public selectRound(round: GolfRound) {
        this._roundsService.selectRound(round);
    }

}
