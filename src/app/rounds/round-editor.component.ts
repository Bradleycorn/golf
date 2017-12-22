import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'golf-editor',
    templateUrl: './round-editor.component.html',
    styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit {
    private _fb: FormBuilder;
    public editorForm: FormGroup;

    constructor(fb: FormBuilder) {
        this._fb = fb;
        this.createForm();
    }

    ngOnInit() {


    }

    private createForm() {
        this.editorForm = this._fb.group({
            dateInput: ['', Validators.pattern(/[0-9]{1,2}{\/|-}[0-9]{1,2}{\/|-}[0-9]{2,4}/)],
            courseInput: ['', Validators.required],
            greensFeeInput: ['', Validators.min(-1)],
            foodInput: ['', Validators.min(0)]
        });
    }
}
