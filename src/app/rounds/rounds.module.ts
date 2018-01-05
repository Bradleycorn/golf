import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundEditorComponent } from './round-editor.component';
import { RoundsRouterModule } from './rounds-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSlideToggleModule
} from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RoundsService } from '../shared/services/rounds.service';
import { RoundListComponent } from './round-list.component';
import { RoundsHomeComponent } from './rounds-home.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule,
        RoundsRouterModule,
        ReactiveFormsModule,
        AngularFirestoreModule
    ],
    providers: [
        RoundsService,
    ],
    declarations: [
        RoundsHomeComponent,
        RoundListComponent,
        RoundEditorComponent
    ],
    exports: [
        RoundsHomeComponent,
        RoundListComponent,
        RoundEditorComponent
    ]
})
export class RoundsModule { }
