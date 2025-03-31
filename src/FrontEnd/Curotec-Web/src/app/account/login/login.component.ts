import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  errors: any[] = [];
  loginForm: FormGroup | any;
  user: User | any;

  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();

    this.validationMessages = {
      email: {
        required: 'Inform e-mail',
        email: 'Email invalid',
      },
      password: {
        required: 'Inform password',
        rangeLength: 'A password must be between 6 and 15 characters',
      },
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configureBaseValidationMessages(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.loginForm);
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUserData(response);

    let toast = this.toastr.success(
      'Login realizado com Sucesso!',
      'Bem vindo!!!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.returnUrl
          ? this.router.navigate([this.returnUrl])
          : this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
