import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { StringUtils } from 'src/app/utils/string-utils';
import { Contractor } from '../models/contractor';
import { Address } from '../models/address';
import { ContractorService } from '../services/contractor.service';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] | any;

  errors: any[] = [];
  addressErrors: any[] = [];
  contractorForm: FormGroup | any;
  addressForm: FormGroup | undefined;

  contractor: Contractor = new Contractor();
  address: Address = new Address();

  documentLabel: string = '';

  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    super();

    config.backdrop = 'static';
    config.keyboard = false;

    this.validationMessages = {
      name: {
        required: 'Please enter the name',
      },
      document: {
        required: 'Please enter the document',
        cpf: 'Invalid CPF format',
        cnpj: 'Invalid CNPJ format',
      },
      address1: {
        required: 'Please enter the address1',
      },
      address2: {
        required: 'Please enter the address2',
      },
      zipCode: {
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

    this.contractor = this.route.snapshot.data['contractor'];
  }

  ngOnInit() {
    this.spinner.show();

    this.contractorForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],
    });

    this.addressForm = this.fb.group({
      id: '',
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      contractorId: '',
    });

    this.fillForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  fillForm() {
    this.contractorForm?.patchValue({
      id: this.contractor.id,
      name: this.contractor.name,
      active: this.contractor.active,
      document: this.contractor.document,
    });

    this.documentControl()?.setValidators([Validators.required]);

    this.addressForm?.patchValue({
      id: this.contractor.address.id,
      address1: this.contractor.address.address1,
      address2: this.contractor.address.address2,
      zipcode: this.contractor.address.zipcode,
      cidade: this.contractor.address.city,
      estado: this.contractor.address.state,
    });
  }

  ngAfterViewInit() {
    super.configureBaseFormValidation(
      this.formInputElements,
      this.contractorForm
    );
  }

  switchDocumentValidation() {
    this.documentControl()?.clearValidators();
    this.documentControl()?.setValidators([Validators.required]);
  }

  documentControl(): AbstractControl | null {
    return this.contractorForm?.get('document');
  }

  updateContractor() {
    if (this.contractorForm.dirty && this.contractorForm.valid) {
      this.contractor = Object.assign(
        {},
        this.contractor,
        this.contractorForm.value
      );
      this.contractor.document = StringUtils.onlyNumbers(
        this.contractor.document
      );

      this.contractorService.update(this.contractor).subscribe({
        next: (success: any) => {
          this.handleSuccess(success);
        },
        error: (fail: any) => {
          this.handleFailure(fail);
        },
      });
    }
  }

  handleSuccess(response: any) {
    this.errors = [];

    const toast = this.toastr.success(
      'Contractor successfully updated!',
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

  updateAddress() {
    if (this.addressForm?.dirty && this.addressForm?.valid) {
      this.address = Object.assign({}, this.address, this.addressForm.value);

      this.address.zipcode = StringUtils.onlyNumbers(this.address.zipcode);
      this.address.contractorId = this.contractor.id;

      this.contractorService.updateAddress(this.address).subscribe({
        next: () => this.handleAddressSuccess(this.address),
        error: (fail: any) => {
          this.handleAddressFailure(fail);
        },
      });
    }
  }

  handleAddressSuccess(address: Address) {
    this.errors = [];

    this.toastr.success('Address successfully updated!', 'Success!');
    this.contractor.address = address;
    this.modalService.dismissAll();
  }

  handleAddressFailure(fail: any) {
    this.addressErrors = fail.error.errors;
    this.toastr.error('An error occurred!', 'Oops :(');
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
}
