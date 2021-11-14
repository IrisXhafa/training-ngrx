import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExercises: BehaviorSubject<Exercise[]> = new BehaviorSubject([] as any);
  pastExercises: BehaviorSubject<Exercise[]> = new BehaviorSubject([] as any);
  activeExercise: BehaviorSubject<Exercise | undefined> = new BehaviorSubject(undefined as any);
  constructor(
    private firestore: AngularFirestore
  ) { }

  startExercise(exId: string): void{
    this.activeExercise.next(this.availableExercises.value.find(e => e.id === exId))
  }

  cancelExercise(): void{
    const ex = {
      ...this.activeExercise.value,
      date: new Date(),
      status: 'completed'
    }
    console.log(this.activeExercise.value);
    this.activeExercise.next(undefined);
    this.addPastExercise(ex as any);
  }

  completeExercise(): void{
    const ex = {
      ...this.activeExercise.value,
      date: new Date(),
      status: 'completed'
    }
    console.log(this.activeExercise.value);
    this.activeExercise.next(undefined);
    this.addPastExercise(ex as any);
  }

  fetchAvailableExercises(): any{
    this.firestore.collection('availableExercises').snapshotChanges()
    .pipe(
      map(list => list.map(doc => ({
        id: doc.payload.doc.id,
        name: (doc.payload.doc.data() as any).name,
        duration: (doc.payload.doc.data() as any).duration,
        calories: (doc.payload.doc.data() as any).calories
      })))
    )
    .subscribe(
      (res: Exercise[]) => this.availableExercises.next(res)
    );
  }
  
  fetchPastExercises(): void{
    this.firestore.collection('pastExercises').snapshotChanges()
    .pipe(
      map(list => list.map(doc => ({
        id: doc.payload.doc.id,
        name: (doc.payload.doc.data() as any).name,
        duration: (doc.payload.doc.data() as any).duration,
        calories: (doc.payload.doc.data() as any).calories,
        status: (doc.payload.doc.data() as any).status,
        date: (doc.payload.doc.data() as any).date
      })))
    )
    .subscribe(
      (res: Exercise[]) => this.availableExercises.next(res)
    );
  }

  addPastExercise(ex: Exercise): void{
    this.firestore.collection('pastExercises').add(ex);
  }
}
