import { MaterialModule } from './../material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { StopTrainingComponent } from './components/current-training/components/stop-training/stop-training.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [TrainingComponent, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent, StopTrainingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFirestoreModule,
    RouterModule.forChild([
      {path: '', component: TrainingComponent},
      {path: 'new', component: NewTrainingComponent},
    ])
  ]
})
export class TrainingModule { }
