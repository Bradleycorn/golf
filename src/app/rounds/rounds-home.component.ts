import { Component } from '@angular/core';
import { RoundsService } from '../shared/services/rounds.service';
import { GolfRound } from '../shared/models/golf-round.class';

@Component({
    selector: 'golf-rounds',
    templateUrl: './rounds-home.component.html',
    styleUrls: ['./rounds-home.component.scss']
})
export class RoundsHomeComponent {

    constructor(private _roundsService: RoundsService) {
    }

    public get selectedRound(): GolfRound {
        return this._roundsService.selectedRound;
    }

}
