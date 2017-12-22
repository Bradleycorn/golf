import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundEditorComponent } from './round-editor.component';
import { RoundsRouterModule } from './rounds-router.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
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
