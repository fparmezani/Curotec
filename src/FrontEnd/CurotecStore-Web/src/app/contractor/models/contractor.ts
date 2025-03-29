import { Endereco } from './address';
import { Produto } from 'src/app/product/models/product';

export class Contractor {
  id: string;
  name: string;
  document: string;
  active: boolean;
  address: Endereco;
  products: Produto[];
}
