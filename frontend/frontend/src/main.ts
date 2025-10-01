// src/main.ts
import { enableProdMode, provideAppInitializer, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfigService } from './app/services/config.service';
import { authInterceptorProviders } from './app/services/auth.interceptor';
import { provideRouter, withHashLocation, Routes } from '@angular/router';

// Import your components
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { SignupComponent } from './app/pages/signup/signup.component';
import { DashboardComponent } from './app/pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './app/pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './app/pages/profile/profile.component';
import { WelcomeComponent } from './app/pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './app/pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './app/pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './app/pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './app/pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './app/pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './app/pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './app/pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './app/pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './app/pages/user/instructions/instructions.component';
import { StartComponent } from './app/pages/user/start/start.component';
import { AdminGuard } from './app/services/admin.guard';
import { NormalGuard } from './app/services/normal.guard';
import { ImageUploadComponent } from './app/image-upload/image-upload.component';

if (environment.production) {
  enableProdMode();
}

// Define routes
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: ViewCategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ViewQuizzesComponent },
      { path: 'image-upload', component: ImageUploadComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'quiz/:qid', component: UpdateQuizComponent },
      { path: 'view-questions/:qid/:title', component: ViewQuizQuestionsComponent },
      { path: 'add-question/:qid/:title', component: AddQuestionComponent },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      { path: ':catId', component: LoadQuizComponent },
      { path: 'instructions/:qid', component: InstructionsComponent },
    ],
  },
  { path: 'start/:qid', component: StartComponent, canActivate: [NormalGuard] },
];

// Bootstrap Angular with hash routing and app initializer
bootstrapApplication(AppComponent, {
  providers: [
    authInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    ConfigService,
    provideAnimations(),
    provideRouter(routes, withHashLocation()), // ✅ hash routing to fix 404 on refresh
   provideAppInitializer(() => {
  const configService = inject(ConfigService);
  return configService.loadConfig(); // ✅ return Promise<void> directly
})
,
  ],
}).catch(err => console.error(err));
