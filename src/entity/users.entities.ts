export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  country: string; // País do usuario
  state: string; // Estado do País do usuario
  cities: string; // Cidade do usuario
  cep: number; // Cep do usuario
  district: string; // Bairro do usuario
  street: string; // Rua do usuario
  number: number; // Numero do usuario
  created_at: Date; // Criado do usuario
  updated_at: Date; // Criado do usuario
}
