import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Person {
    id: number;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  private http = inject(HttpClient);

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/drizzle').pipe(
      catchError((error) => {
        // If the API call fails (e.g., 404 in AI Studio Preview),
        // return the same dummy data as the backend.
        console.warn('API call to /api/drizzle failed, likely in a preview environment. Returning dummy data.', error);
        const dummyPeople: Person[] = [
          { id: 1, name: 'Alice (dummy data)' },
          { id: 2, name: 'Bob (dummy data)' },
          { id: 3, name: 'Charlie (dummy data)' },
          { id: 4, name: 'Diana (dummy data)' },
        ];
        return of(dummyPeople);
      })
    );
  }
}
