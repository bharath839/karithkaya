import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import { RabbitmqService } from './rabbitmq.service';
import { ConfigService } from './services/config.service';

// Components (if they are also standalone, otherwise they are declared in their own feature modules)
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { SidebarComponent as UserSidebar } from './pages/user/sidebar/sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CKEditorModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,

    // All application components need to be imported here if they are standalone
    NavbarComponent,
    FooterComponent,
    // Removed: NotificationComponent,

    // The following components are routed and should not be imported directly into AppComponent.
    // Removed: SignupComponent,
    // Removed: LoginComponent,
    // Removed: HomeComponent,
    // Removed: DashboardComponent,
    // Removed: UserDashboardComponent,
    // Removed: ProfileComponent,
    // Removed: SidebarComponent,
    // Removed: WelcomeComponent,
    // Removed: ViewCategoriesComponent,
    // Removed: AddCategoryComponent,
    // Removed: ViewQuizzesComponent,
    // Removed: AddQuizComponent,
    // Removed: UpdateQuizComponent,
    // Removed: ViewQuizQuestionsComponent,
    // Removed: AddQuestionComponent,
    // Removed: UserSidebar,
    // Removed: LoadQuizComponent,
    // Removed: InstructionsComponent,
    // Removed: StartComponent,
  ],
})
export class AppComponent  implements OnInit{
  title = 'TestYourself';

 constructor(private configService: ConfigService,private websocketService: RabbitmqService,private http: HttpClient, private renderer: Renderer2) {
    this.websocketService.connect();
  }
  ngOnInit(): void {
   
    this.loadBackgroundImage();
  }


   
loadBackgroundImage() {
  this.http.get(`${this.configService.image_url}/api/images/background`, { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
        this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
        this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
      };
      reader.readAsDataURL(blob);
    });
  }
}
