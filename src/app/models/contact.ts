import {Guid} from 'guid-typescript';
import {Gender} from '../gender';

export class Contact {
  public id: Guid | undefined;
  public name: string;
  public gender: Gender;
  public phone: string;

  constructor(name: string, phone: string, gender: Gender) {
      this.name = name;
      this.phone = phone;
      this.gender = gender;
  }
}
