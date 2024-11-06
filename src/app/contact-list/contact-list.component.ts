import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/contact';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {ContactItemComponent} from '../contact-item/contact-item.component';
import {ContactService} from '../contact.service';
import {ContactFormComponent} from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    ContactItemComponent,
    ContactFormComponent
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {
    public contacts: Contact[] = [];
    public selectedContact: Contact | undefined;
    public addButtonHidden: boolean = true;
    public contactFormHidden: boolean = true;

    constructor(private contactService: ContactService) {}

    ngOnInit(): void {
      this.contactService.getContacts().subscribe(data => {
        this.contacts = data;
        this.addButtonHidden = false;
      });
    }

  // receives the event emitted by the contact-item
  ReceiveRemoveContactEvent($event: any) {
      this.contactService.removeContact($event.id).subscribe(() => {
        this.contacts.splice($event.index, 1);

        if(this.selectedContact?.id === $event.id)
          this.selectedContact = undefined;

        console.log('deleted successfully');
      });
  }

  // receives openEdit event emitted by the contact-item
  ReceiveOpenEditContactFormEvent($event: any) {
      let index : number = $event;
      this.selectedContact = this.contacts[index];

      if(this.contactFormHidden)
        this.contactFormHidden = false;
  }

  // receives the add event emitted by the contact-form
  ReceieveAddContactEvent($event: Contact) {
      let contact = $event;
      this.contactService.addContact(contact).subscribe((data) => {
        contact.id = data;
        this.contacts.push(contact);
      });
  }
  // receives the update contact event by the contact-form
  ReceieveUpdateContactEvent($event: Contact) {
    let contact = $event;

    let newContactData = {
      name: contact.name,
      gender: contact.gender,
      phone: contact.phone
    };

    this.contactService.updateContact(contact.id, newContactData).subscribe(() => {
      console.log('updated successfully');
      this.selectedContact = undefined;
      this.contactFormHidden = true;
    });
  }

  ToggleContactForm() {
    this.contactFormHidden = !this.contactFormHidden;
  }
}
