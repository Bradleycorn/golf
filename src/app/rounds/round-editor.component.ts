import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoundsService } from '../shared/services/rounds.service';
import { MatChipListChange } from '@angular/material';
import { FormControl, AbstractControl } from '@angular/forms/src/model';
import { GolfRound } from '../shared/models/golf-round.class';

@Component({
    selector: 'golf-editor',
    templateUrl: './round-editor.component.html',
    styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit {
    private _fb: FormBuilder;
    private _roundsService: RoundsService;

    public editorForm: FormGroup;
    public foodControl: FormControl;
    public readonly chips = [ 'walked', 'rode' ];

    @Input()
    private round: GolfRound;

    constructor(roundsService: RoundsService, fb: FormBuilder) {
        this._fb = fb;
        this.createForm();
    }

    ngOnInit() {
        this.editorForm.controls['ateFoodCheck'].valueChanges.subscribe((value) => {
            if (value === true) {
                this.editorForm.addControl('foodInput', this.foodControl);
            } else if (this.editorForm.contains('foodInput')) {
                this.editorForm.removeControl('foodInput');
            }
        });

    }

    public saveRound() {
        const formModel = this.editorForm.value;

        if (!this.round) {
            this.round = new GolfRound();
        }

        this.round.date = formModel.dateInput as Date;
        this.round.course = formModel.courseInput as string;
        this.round.greensFee = formModel.greensFeeInput as number;
        this.round.rodeCart = formModel.rodeCart as boolean;
        this.round.ateFood = formModel.ateFoodCheck as boolean;

        if (this.round.ateFood) {
            this.round.foodCost = formModel.foodInput as number;
        }

        this._roundsService.saveRound(this.round);
    }

    private createForm() {
        this.editorForm = this._fb.group({
            dateInput: ['', [Validators.required, Validators.pattern(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{2,4}/)]],
            courseInput: ['', Validators.required],
            greensFeeInput: ['', [Validators.required, Validators.min(0)]],
            ateFoodCheck: [],
            cartInput: [true]
        });
        this.foodControl = this._fb.control('', [Validators.required, Validators.min(0)]);
    }

    public toggleCart(rodeCart) {
        this.editorForm.patchValue({cartInput: rodeCart});
    }

}
