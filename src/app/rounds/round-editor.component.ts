import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoundsService } from '../shared/services/rounds.service';
import { MatChipListChange } from '@angular/material';
import { FormControl, AbstractControl } from '@angular/forms/src/model';
import { GolfRound } from '../shared/models/golf-round.class';
import { UTILS } from '../shared/utils.class';

import * as moment from 'moment';


interface IFormModel {
    dateInput: string;
    courseInput: string;
    greensFeeInput: number;
    cartInput: boolean;
    ateFoodCheck: boolean;
    foodInput?: number;
}

@Component({
    selector: 'golf-editor',
    templateUrl: './round-editor.component.html',
    styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit, OnChanges {
    private _fb: FormBuilder;
    private _roundsService: RoundsService;

    public editorForm: FormGroup;
    public foodControl: FormControl;
    public readonly chips = [ 'walked', 'rode' ];

    @Input()
    private round: GolfRound;

    constructor(roundsService: RoundsService, fb: FormBuilder) {
        this._fb = fb;
        this._roundsService = roundsService;
        this.createForm();
    }

    ngOnInit() {

        this.editorForm.controls['ateFoodCheck'].valueChanges.subscribe((value) => {
            if (value === true && !this.editorForm.contains('foodInput')) {
                this.editorForm.addControl('foodInput', this.foodControl);
                if (this.round) {
                    this.editorForm.patchValue({foodInput: this.round.foodCost});
                }
            } else if (value === false && this.editorForm.contains('foodInput')) {
                this.editorForm.removeControl('foodInput');
            }
        });

    }

    private createForm() {
        this.editorForm = this._fb.group({
            dateInput: ['', [Validators.required, Validators.pattern(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{2,4}/)]],
            courseInput: ['', Validators.required],
            greensFeeInput: ['', [Validators.required, Validators.min(0)]],
            cartInput: [true],
            ateFoodCheck: [],
        });
        this.foodControl = this._fb.control('', [Validators.required, Validators.min(0)]);
    }

    ngOnChanges() {
        let formModel: IFormModel;

        if (this.round) {
            
            if (this.editorForm.contains('foodInput')) {
                this.editorForm.removeControl('foodInput');
            }
            
            formModel = {
                dateInput: moment(this.round.date).format('M/D/Y'),
                courseInput: this.round.course,
                greensFeeInput: this.round.greensFee,
                cartInput: this.round.rodeCart,
                ateFoodCheck: this.round.ateFood,
            };
        } else {
            this.editorForm.removeControl('foodInput');
        }
        
        this.editorForm.reset(formModel);
    }
    
    

    public saveRound() {
        const formModel = this.editorForm.value;

        if (!this.round) {
            this.round = new GolfRound();
        }

        this.round.date = moment(formModel.dateInput).toDate();
        this.round.course = formModel.courseInput as string;
        this.round.greensFee = UTILS.coerceToFloat(formModel.greensFeeInput, 0);
        this.round.rodeCart = formModel.cartInput as boolean;
        this.round.ateFood = formModel.ateFoodCheck as boolean;

        if (this.round.ateFood) {
            this.round.foodCost = UTILS.coerceToFloat(formModel.foodInput as number, 0);
        }

        this._roundsService.saveRound(this.round);
    }
    
    public cancel() {
        this._roundsService.selectRound(null);
    }
    
    private validateFoodCosts(formControl: AbstractControl) {
        if (this.editorForm.value.ateFoodCheck === true) {
            if (UTILS.coerceToFloat(formControl.value, -1) === -1) {
                return {foodCosts: {value: formControl.value}};
            }
        }
        return null;
    }

    public toggleCart(rodeCart) {
        this.editorForm.patchValue({cartInput: rodeCart});
    }

}
