import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent
  extends FormBaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements:
    | ElementRef[]
    | undefined;

  errors: any[] = [];
  registerForm: FormGroup | undefined;
  user: User;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();

    this.validationMessages = {
      email: {
        required: 'Please enter your email',
        email: 'Invalid email',
      },
      password: {
        required: 'Please enter your password',
        rangeLength: 'Password must be between 6 and 15 characters',
      },
      confirmPassword: {
        required: 'Please confirm your password',
        rangeLength: 'Password must be between 6 and 15 characters',
        equalTo: 'Passwords do not match',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    const password = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    const confirmPassword = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(password),
    ]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.registerForm
    );
  }

  registerAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.registerForm.value);

      this.contaService.registrarUsuario(this.usuario).subscribe(
        (success) => {
          this.handleSuccess(success);
        },
        (fail) => {
          this.handleFailure(fail);
        }
      );

      this.changesnotSave = false;
    }
  }

  handleSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.salvarDadosLocaisUsuario(response);

    const toast = this.toastr.success('Registration successful!', 'Welcome!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  handleFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred!', 'Oops :(');
  }
}
