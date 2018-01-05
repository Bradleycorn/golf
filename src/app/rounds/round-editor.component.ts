import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoundsService } from '../shared/services/rounds.service';
import { MatChipListChange } from '@angular/material';

@Component({
    selector: 'golf-editor',
    templateUrl: './round-editor.component.html',
    styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit {
    private _fb: FormBuilder;
    public editorForm: FormGroup;

    public readonly chips = [ 'walked', 'rode' ];
    
    constructor(roundsService: RoundsService, fb: FormBuilder) {
        this._fb = fb;
        this.createForm();
    }

    ngOnInit() {


    }

    private createForm() {
        this.editorForm = this._fb.group({
            dateInput: ['', [Validators.required, Validators.pattern(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{2,4}/)]],
            courseInput: ['', Validators.required],
            greensFeeInput: ['', [Validators.required, Validators.min(0)]],
            foodInput: ['', [Validators.min(0)]],
            ateFoodCheck: [],
            cartInput: [true]
        });
        this.editorForm.
    }
    
    public toggleCart(rodeCart) {
        this.editorForm.patchValue({cartInput: rodeCart});
    }

}
