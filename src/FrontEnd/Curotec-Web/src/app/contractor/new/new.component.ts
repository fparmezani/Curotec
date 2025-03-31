import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Contractor } from '../models/contractor';
import { ContractorService } from '../services/contractor.service';
import { StringUtils } from 'src/app/utils/string-utils';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  errors: any[] = [];
  contractorForm: FormGroup | any;
  contractor: Contractor = new Contractor();

  documentText: string = 'CPF (required)';
  formResult: string = '';

  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();

    this.validationMessages = {
      nome: {
        required: 'Please enter the name',
      },
      documento: {
        required: 'Please enter the document',
      },
      address1: {
        required: 'Please enter the Address1',
      },
      address2: {
        required: 'Please enter the Address2',
      },
      zipcode: {
        required: 'Please enter the ZIP code',
        cep: 'Invalid ZIP code format',
      },
      city: {
        required: 'Please enter the city',
      },
      state: {
        required: 'Please enter the state',
      },
    };

    super.configureBaseValidationMessages(this.validationMessages);
  }

  ngOnInit() {
    this.contractorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      }),
    });

    this.contractorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(
      this.formInputElements,
      this.contractorForm
    );
  }

  // switchDocumentValidation() {
  //   if (this.contractorTypeControl().value === '1') {
  //     this.documentControl().clearValidators();
  //     this.documentControl().setValidators([Validators.required]);
  //     this.documentText = 'CPF (required)';
  //   } else {
  //     this.documentControl().clearValidators();
  //     this.documentControl().setValidators([Validators.required]);
  //     this.documentText = 'CNPJ (required)';
  //   }
  // }

  documentControl(): AbstractControl {
    return this.contractorForm.get('document');
  }

  // searchCep(cep: string) {
  //   cep = StringUtils.onlyNumbers(cep);
  //   if (cep.length < 8) return;

  //   // this.contractorService.consultarCep(cep).subscribe(
  //   //   (cepRetorno) => this.fillAddressFromCep(cepRetorno),
  //   //   (erro) => this.errors.push(erro)
  //   // );
  // }

  // fillAddressFromCep(cepConsulta: CepConsulta) {
  //   this.contractorForm.patchValue({
  //     endereco: {
  //       logradouro: cepConsulta.logradouro,
  //       bairro: cepConsulta.bairro,
  //       cep: cepConsulta.cep,
  //       cidade: cepConsulta.localidade,
  //       estado: cepConsulta.uf,
  //     },
  //   });
  // }

  addContractor() {
    if (this.contractorForm.dirty && this.contractorForm.valid) {
      this.contractor = Object.assign(
        {},
        this.contractor,
        this.contractorForm.value
      );
      this.formResult = JSON.stringify(this.contractor);

      this.contractor.address.zipcode = StringUtils.onlyNumbers(
        this.contractor.address.zipcode
      );
      this.contractor.document = StringUtils.onlyNumbers(
        this.contractor.document
      );

      this.contractorService.create(this.contractor).subscribe(
        (success: any) => {
          this.handleSuccess(success);
        },
        (fail: any) => {
          this.handleFailure(fail);
        }
      );
    }
  }

  handleSuccess(response: any) {
    this.contractorForm.reset();
    this.errors = [];

    this.unsavedChanges = false;

    const toast = this.toastr.success(
      'Contractor successfully registered!',
      'Success!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contractors/list-all']);
      });
    }
  }

  handleFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred!', 'Oops :(');
  }
}
