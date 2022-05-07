import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAQS } from '../interfaces/faq.interface';

@Injectable({providedIn: 'root'})
export class FAQService {
  constructor(private httpClient: HttpClient) { }

  FAQS(): Observable<FAQS> {
    return this.httpClient.get<FAQS>('/assets/json/faqs.json');
  }
}
