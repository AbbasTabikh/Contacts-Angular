import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Contact} from '../models/contact';
import {Gender} from '../gender';
import {Guid} from 'guid-typescript';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
 @Input() contact: Contact | undefined;
 @Input() index: number | undefined;
 @Output() removeContactEvent = new EventEmitter<any>();
 @Output() openEditContactFormEvent = new EventEmitter<number>();

 protected readonly Gender = Gender;
  Remove(id: Guid | undefined) {
    if(id === undefined)
      return;

    this.removeContactEvent.emit({ index: this.index, id: this.contact?.id});
  }

  OpenEdit($event : MouseEvent) {
    $event.preventDefault();
    this.openEditContactFormEvent.emit(this.index);
  }
}
