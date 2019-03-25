import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTableModule} from "angular-6-datatable";
import { QuestionsComponent } from './components/questions/questions.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    QuestionsComponent
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {
      path : '',
      component : AdminLoginComponent
    },
    {
      path : 'login',
      component : AdminLoginComponent
    },
    {
      path : 'admindashboard',
      component : AdminDashboardComponent
    },
    {
      path : 'admindashboard/questions',
      component :  QuestionsComponent
    }
    
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
