import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Gender} from '../gender';
import {Contact} from '../models/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnChanges {
  protected readonly Gender = Gender;
  public gender: Gender | undefined;
  public name: string | undefined;
  public phoneNumber: string | undefined;

  @Input() selectedContact : Contact | undefined;
  @Output() addContactEvent = new EventEmitter<Contact>();
  @Output() updateContactEvent = new EventEmitter<Contact>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedContact'] && changes['selectedContact'].currentValue) {
      this.name = this.selectedContact?.name;
      this.gender = this.selectedContact?.gender;
      this.phoneNumber = this.selectedContact?.phone;
    }

    else
      this.ResetFields();
  }

  SaveContact() {
    // case update
    if(this.selectedContact) {
      if (this.phoneNumber !== undefined)
        this.selectedContact.phone = this.phoneNumber;

      if (this.name !== undefined)
        this.selectedContact.name = this.name;

      if (this.gender)
        this.selectedContact.gender = this.gender;

      this.updateContactEvent.emit(this.selectedContact);
      this.selectedContact = undefined;
      this.ResetFields();
      return;
    }

    //case add
    let contact = new Contact(this.name ? this.name : "", this.phoneNumber ? this.phoneNumber : "Not Set", this.gender ? this.gender : Gender.Male);
    console.log(contact?.gender, Gender.Female, contact.gender === Gender.Female);
    this.addContactEvent.emit(contact);
    this.ResetFields();
  }

  private ResetFields(): void {
    this.phoneNumber = undefined;
    this.gender = undefined;
    this.name = undefined;
  }
}
