import { TrainingService } from './../../training.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Exercise } from '../../training';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  @Output() trainingStart: EventEmitter<boolean> = new EventEmitter();
  exercises: Exercise[] = [];
  destroy$: Subject<any> = new Subject();
  formGroup!: FormGroup;
  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      active: new FormControl('', Validators.required)
    })
    this.trainingService.fetchAvailableExercises();
    this.trainingService.availableExercises.pipe(takeUntil(this.destroy$)).subscribe(
      res => this.exercises = res
    )
  }


  onTrainingStart(): void{
    this.trainingService.startExercise(this.formGroup.value.active)
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
