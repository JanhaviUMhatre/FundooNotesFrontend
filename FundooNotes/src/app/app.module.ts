import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { from } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ResetComponent } from './components/reset/reset.component';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { LabelsComponent } from './components/labels/labels.component';
import { FootermenuComponent } from './components/footermenu/footermenu.component';
import { NotesComponent } from './components/notes/notes.component';
import { SearchPipe } from './pipe/search.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { PinedComponent } from './components/pined/pined.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { DemoComponent } from './components/demo/demo.component';
import { QuestionComponent } from './components/question/question.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AuthGuard } from './auth.guard'
import { ImageCropperModule } from 'ngx-image-cropper';
import { RatingModule } from 'ng-starrating';
import { HomeComponent } from './components/home/home.component';
import { PackageselectComponent } from './components/packageselect/packageselect.component';
import { NewloginComponent } from './components/newlogin/newlogin.component';
import { NewregisterComponent } from './components/newregister/newregister.component';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    //FlexLayoutModule,
    RegistrationComponent,
   
    ResetPasswordComponent,
   
    ResetComponent,
   
    AddnoteComponent,
   
    LabelsComponent,
   
    FootermenuComponent,
   
    NotesComponent,
   
    SearchPipe,
   
    SearchbarComponent,
   
    AddlabelComponent,
   
    TrashComponent,
   
    ArchiveComponent,
   
    ProfileComponent,
   
    RemindersComponent,
   
    PinedComponent,
   
    CollaboratorComponent,
   
    DemoComponent,
   
    QuestionComponent,
   
    HomeComponent,
   
    PackageselectComponent,
   
    NewloginComponent,
   
    NewregisterComponent,
  ],
  imports: [AppRoutingModule,
    FroalaEditorModule.forRoot(),
     FroalaViewModule.forRoot(),
     RatingModule,
    BrowserModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MaterialModule,
    RouterModule,
    ImageCropperModule
  ],
  entryComponents:[
    CollaboratorComponent
      ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }