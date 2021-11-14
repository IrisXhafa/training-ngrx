import { TrainingService } from './../../training.service';
import { Exercise } from './../../training';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  activeExercise!: Exercise;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  progress = 0;
  interval!: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    const step = this.activeExercise?.duration / 100 * 1000;
    this.interval = setInterval(() => {
      if(this.progress < 100){
        this.progress += 1;
      } else{
        this.trainingService.completeExercise()
        clearInterval(this.interval);
      }
    }, step)
  }

  startOrResumeTimer(): void{
    this.interval = setInterval(() => {
      if(this.progress < 100){
        this.progress +=10;
      } else{
        this.trainingService.completeExercise();
        clearInterval(this.interval);
      }
    }, 200)
  }

  onStop(): void{
      clearInterval(this.interval);
      this.dialog.open(StopTrainingComponent, {
        data: {
          progress: this.progress 
        }
      }).afterClosed().subscribe(res => {
        if(res){
          clearInterval(this.interval);
          this.trainingService.cancelExercise();
          this.progress = 0;
        } else{
          this.startOrResumeTimer();
        }
      })
  }

}
