import { takeUntil } from 'rxjs/operators';
import { TrainingService } from './training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  isTraining: boolean = false;
  destroy$: Subject<any> = new Subject();
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingService.activeExercise.pipe(takeUntil(this.destroy$)).subscribe(res => this.isTraining = res ? true : false);
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}
