import { Address } from './address';
//import { Product } from 'src/app/product/models/product';

export class Contractor {
  id: string = '';
  name: string = '';
  document: string = '';
  active: boolean = false;
  address: Address = new Address();
  products: [] | any;
}
