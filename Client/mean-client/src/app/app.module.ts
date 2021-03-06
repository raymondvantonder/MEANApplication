import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ShellComponent } from './components/shell/shell.component';
import { RegisterComponent } from './components/features/register/components/register.component';
import { LoginComponent } from './components/features/login/components/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterContainerComponent } from './components/features/register/container/register-container.component';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/app-reducer';
import { AppEffects } from './state/app-effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginContainerComponent } from './components/features/login/container/login-container.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeContainerComponent } from './components/features/home/container/home-container.component';
import { HomeComponent } from './components/features/home/components/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HeadersInterceptor } from './_core/http-interceptors/header-interceptor';
import { HttpErrorInterceptor } from './_core/http-interceptors/http-error-interceptor';
import { SnackbarComponent } from './components/shell/snackbar/snackbar.component';

@NgModule({
  declarations: [
    ShellComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    PagenotfoundComponent,
    RegisterContainerComponent,
    LoginContainerComponent,
    LandingComponent,
    HomeComponent,
    HomeContainerComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('appstate', reducer),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'M.E.A.N. Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [ShellComponent]
})
export class AppModule { }
