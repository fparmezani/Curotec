import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../services/contractor.service';
import { Contractor } from '../models/contractor';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  public contractors: Contractor[] = [];
  errorMessage: string | undefined;

  constructor(private contractorService: ContractorService) {}

  ngOnInit(): void {
    this.contractorService.getAll().subscribe(
      (contractors) => (this.contractors = contractors),
      (error) => this.errorMessage
    );
  }
}
