import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundsHomeComponent } from './rounds-home.component';

const roundsPaths: Routes = [
    { path: 'rounds', component: RoundsHomeComponent }
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
