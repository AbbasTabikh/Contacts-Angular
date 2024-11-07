import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Gender} from '../gender';
import {Contact} from '../models/contact';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnChanges {
  protected readonly Gender = Gender;
  @Input() selectedContact : Contact | undefined;
  @Output() addContactEvent = new EventEmitter<Contact>();
  @Output() updateContactEvent = new EventEmitter<Contact>();

  // Define the FormGroup
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedContact'] && changes['selectedContact'].currentValue) {
      this.contactForm.patchValue({
        name: this.selectedContact?.name,
        phoneNumber: this.selectedContact?.phone,
        gender: this.selectedContact?.gender
      });
    }

    else
      this.ResetFields();
  }

  SaveContact() {

    let { name, phoneNumber, gender } = this.contactForm.value;

    // case update
    if(this.selectedContact) {
      this.selectedContact.name = name; //from contact form
      this.selectedContact.phone = phoneNumber; //from contact form
      this.selectedContact.gender = gender; //from contact form

      this.updateContactEvent.emit(this.selectedContact);
      this.selectedContact = undefined;
    }

    //case add
    else{
      let contact = new Contact(name, phoneNumber, gender);
      this.addContactEvent.emit(contact);
    }

    this.ResetFields();
  }

  private ResetFields(): void {
    this.contactForm.patchValue({
      name: '',
      phoneNumber: '',
      gender: undefined
    });
  }
}
