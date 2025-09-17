import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
    id: number;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  private http = inject(HttpClient);

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/drizzle');
  }
}
