import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ServicesModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule

  ]
})
export class AuthModule { }
