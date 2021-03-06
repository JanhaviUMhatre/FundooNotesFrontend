import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { FootermenuComponent } from './components/footermenu/footermenu.component';
import { AuthGuard } from './auth.guard'
import { NotesComponent } from './components/notes/notes.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';
import { NewloginComponent } from './components/newlogin/newlogin.component';
import { NewregisterComponent } from './components/newregister/newregister.component';
import { PackagecardComponent } from './components/packagecard/packagecard.component';
import { CartComponent } from './components/cart/cart.component';
import { PinedComponent } from './components/pined/pined.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'newlogin',
    component: NewloginComponent
  },
  {
    path: 'newregister',
    component: NewregisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'packagecard',
    component: PackagecardComponent
  },
 
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'addlabel',
        component: AddlabelComponent
      },
      

      {
        path: '',
        component: AddnoteComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'addNote',
        component: AddnoteComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'pined',
        component: PinedComponent
      },
      {
        path: 'search',
        component: SearchbarComponent
      },

      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent,

      },
      {
        path: 'reminder',
        component: RemindersComponent
      },
      {
        path: 'questions',
        component: QuestionComponent
      },

      {
        path: 'addNote/questions',
        component: QuestionComponent
      },
      {
        path: 'archive/questions',
        component: QuestionComponent
      },
      {
        path: 'trash/questions',
        component: QuestionComponent
      },
      {
        path: 'reminder/questions',
        component: QuestionComponent
      },

    ]
  },
  {
    path: 'questions',
    component: QuestionComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'footer',
    component: FootermenuComponent
  },
  {
    path: '**', component: NotFoundComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //exports:[RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [RegistrationComponent,
  LoginComponent,
  ResetPasswordComponent,
  ResetComponent,
  DashboardComponent,
  ProfileComponent,
  FootermenuComponent,
  ArchiveComponent,
  TrashComponent,
  NotesComponent,
  RemindersComponent,
  AddlabelComponent,
  SearchbarComponent,
  AddnoteComponent]