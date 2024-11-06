import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Contact} from './models/contact';
import {HttpClient} from '@angular/common/http';
import {Guid} from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl: string = environment.apiUrl + '/contacts';
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + '/get-contacts');
  }

  removeContact(id: Guid): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/delete-by-id/' + id);
  }

  addContact(contact: Contact): Observable<Guid> {
    return this.http.post<Guid>(this.apiUrl + '/add-contact', contact);
  }

  updateContact(id: Guid | undefined, newContactData: any) : Observable<void> {
    return this.http.put<void>(this.apiUrl + '/update-contact/' + id,  newContactData);
  }

}
