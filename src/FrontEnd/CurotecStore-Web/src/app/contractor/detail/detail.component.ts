import { Component } from '@angular/core';
import { Contractor } from '../models/contractor';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  contractor: Contractor = new Contractor();
  enderecoMap;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.contractor = this.route.snapshot.data['contractor'];
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed/v1/place?q=' +
        this.AddressComplete() +
        '&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE'
    );
  }

  public AddressComplete(): string {
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
}
