import { v4 as uuidv4 } from 'uuid';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id || uuidv4();
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public updateName(newName: string): void {
    this.name = newName;
    this.updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    this.email = newEmail;
    this.updatedAt = new Date();
  }
}