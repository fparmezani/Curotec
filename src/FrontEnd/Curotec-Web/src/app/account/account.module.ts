import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { AccountRoutingModule } from './account.route';
import { AccountService } from './services/account.service';

import { AccountGuard } from './services/account.guard';

@NgModule({
  declarations: [AccountAppComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AccountService, AccountGuard],
})
export class AccountModule {}
