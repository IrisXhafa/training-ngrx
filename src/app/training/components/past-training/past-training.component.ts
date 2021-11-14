import { TrainingService } from './../../training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'duration', 'calories', 'status', 'date'];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingService.fetchPastExercises();
    this.trainingService.pastExercises.subscribe(res => {
      this.dataSource = res
    })
  }

}
