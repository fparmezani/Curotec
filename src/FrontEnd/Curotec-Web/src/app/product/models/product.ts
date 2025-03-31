export interface Product {
  id: string;
  name: string;
  description: string;
  //image: string,
  //imagemUpload: string;
  value: number;
  CreatedAt: string;
  active: true;
  contractorId: string;
  nameContractor: string;
}

export interface Contractor {
  id: string;
  name: string;
}
