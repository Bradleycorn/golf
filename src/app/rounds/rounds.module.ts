import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundEditorComponent } from './round-editor.component';
import { RoundsRouterModule } from './rounds-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule,
        RoundsRouterModule,
        ReactiveFormsModule
    ],
    declarations: [
       RoundEditorComponent
    ],
    exports: [
        RoundEditorComponent
    ]
})
export class RoundsModule { }
