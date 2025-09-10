import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { MatLegacyCardHeaderModule } from '@angular/material/legacy-card';
import { MatLegacyCardTitleModule } from '@angular/material/legacy-card';
import { MatLegacyCardSubtitleModule } from '@angular/material/legacy-card';
import { MatLegacyCardContentModule } from '@angular/material/legacy-card';
import { MatLegacyCardActionsModule } from '@angular/material/legacy-card';
import { MatLegacyToolbarModule } from '@angular/material/legacy-toolbar';
import { MatLegacyIconModule } from '@angular/material/legacy-icon';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacySlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySelectModule } from '@angular/material/legacy-select';
import { MatLegacyProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyDividerModule } from '@angular/material/legacy-divider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

// Components
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
import { ImageUploadComponent } from './image-upload/image-upload.component';

// Services
import { authInterceptorProviders } from './services/auth.interceptor';
import { ConfigService } from './services/config.service';

// APP_INITIALIZER
export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        DashboardComponent,
        UserDashboardComponent,
        ProfileComponent,
        SidebarComponent,
        WelcomeComponent,
        ViewCategoriesComponent,
        AddCategoryComponent,
        ViewQuizzesComponent,
        AddQuizComponent,
        UpdateQuizComponent,
        ViewQuizQuestionsComponent,
        AddQuestionComponent,
        UserSidebar,
        LoadQuizComponent,
        InstructionsComponent,
        StartComponent,
        NotificationComponent,
        ImageUploadComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatLegacyButtonModule,
        MatLegacyInputModule,
        MatLegacyFormFieldModule,
        MatLegacySnackBarModule,
        MatLegacyCardModule,
        MatLegacyCardHeaderModule,
        MatLegacyCardTitleModule,
        MatLegacyCardSubtitleModule,
        MatLegacyCardContentModule,
        MatLegacyCardActionsModule,
        MatLegacyToolbarModule,
        MatLegacyIconModule,
        MatLegacyListModule,
        MatLegacySlideToggleModule,
        MatLegacySelectModule,
        CKEditorModule,
        MatLegacyProgressSpinnerModule,
        MatLegacyDividerModule,
        NgxUiLoaderModule,
        NgxUiLoaderHttpModule.forRoot({ showForeground: true })], providers: [
        authInterceptorProviders,
        MatLegacySnackBar,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [ConfigService],
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
