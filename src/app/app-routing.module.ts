import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path: 'training', loadChildren: () => import('../app/training/training.module').then(m => m.TrainingModule), canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
