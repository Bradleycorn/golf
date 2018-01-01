import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundEditorComponent } from './round-editor.component';
import { RoundsRouterModule } from './rounds-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RoundsService } from '../shared/services/rounds.service';
import { RoundListComponent } from './round-list.component';

@NgModule({
    imports: [
        CommonModule,
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
        RoundListComponent,
        RoundEditorComponent
    ],
    exports: [
        RoundListComponent,
        RoundEditorComponent
    ]
})
export class RoundsModule { }
