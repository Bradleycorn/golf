import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundEditorComponent } from './round-editor.component';

const roundsPaths: Routes = [
    { path: 'rounds', component: RoundEditorComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(roundsPaths)
    ],
    exports: [
        RouterModule
    ]
})
export class RoundsRouterModule { }
