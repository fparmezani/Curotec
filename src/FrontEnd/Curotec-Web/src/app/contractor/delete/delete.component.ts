import { Component } from '@angular/core';
import { Contractor } from '../models/contractor';

import { ActivatedRoute, Router } from '@angular/router';
import { ContractorService } from '../services/contractor.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  contractor: Contractor = new Contractor();
  addressMap;
  errors: any[] = [];

  constructor(
    private contractorService: ContractorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.contractor = this.route.snapshot.data['Contractor'];
    this.addressMap = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed/v1/place?q=' +
        this.getFullAddress() +
        '&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE'
    );
  }

  public getFullAddress(): string {
    return (
      this.contractor.address.address1 +
      ', ' +
      this.contractor.address.address2 +
      ', ' +
      this.contractor.address.city +
      ' - ' +
      this.contractor.address.state
    );
  }

  deleteEvent() {
    this.contractorService.delete(this.contractor.id).subscribe(
      () => {
        this.deleteSuccess();
      },
      (error) => {
        this.handleFailure(error);
      }
    );
  }

  deleteSuccess() {
    const toast = this.toastr.success(
      'Contractor successfully deleted!',
      'Goodbye :D'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contractors/list-all']);
      });
    }
  }

  handleFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred during processing!', 'Oops! :(');
  }
}
