import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, map, catchError } from 'rxjs';

export interface Person {
  ID: number;
  name: string;
  location: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostComponentService {
  private apiUrl: string = 'assets/data/post.json'; 
  private persons: Person[] = [];
  private personsSubject = new BehaviorSubject<Person[]>(this.persons);
  public persons$ = this.personsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  
  private loadInitialData(): void {
    this.http.get<Person[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.persons = data;
        this.personsSubject.next([...this.persons]);
      },
      error: (error) => {
        console.error('Error loading data from JSON:', error);
        
        this.persons = [];
        this.personsSubject.next([]);
      }
    });
  }


  getPersons(): Observable<Person[]> {
    if (this.persons.length > 0) {
      return of([...this.persons]);
    } else {
      return this.http.get<Person[]>(this.apiUrl).pipe(
        tap(data => {
          this.persons = data;
          this.personsSubject.next([...this.persons]);
        })
      );
    }
  }

  // Get person by ID
  getPersonById(id: number): Observable<Person | undefined> {
    const person = this.persons.find(p => p.ID === id);
    if (person) {
      return of({ ...person });
    }

    // If not found in cache, load from JSON
    return this.getPersons().pipe(
      tap(() => {
        // Data will be loaded and cached by getPersons()
      }),
      map(() => this.persons.find(p => p.ID === id))
    );
  }

  // Create new person
  createPerson(person: Omit<Person, 'ID'>): Observable<Person> {
    const newId = this.generateNewId();
    const newPerson: Person = {
      ID: newId,
      ...person
    };
    this.persons.push(newPerson);
    this.personsSubject.next([...this.persons]);

    // Note: In a real application, you would make an HTTP POST call here
    // For JSON file, we're just updating the local array
    return of(newPerson);
  }

  // Update existing person
  updatePerson(id: number, personData: Omit<Person, 'ID'>): Observable<Person> {
    const index = this.persons.findIndex(p => p.ID === id);
    if (index !== -1) {
      const updatedPerson: Person = {
        ID: id,
        ...personData
      };
      this.persons[index] = updatedPerson;
      this.personsSubject.next([...this.persons]);

      // Note: In a real application, you would make an HTTP PUT call here
      return of(updatedPerson);
    }
    throw new Error(`Person with ID ${id} not found`);
  }

  // Delete person
  deletePerson(id: number): Observable<boolean> {
    const index = this.persons.findIndex(p => p.ID === id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      this.personsSubject.next([...this.persons]);

      // Note: In a real application, you would make an HTTP DELETE call here
      return of(true);
    }
    return of(false);
  }

  // Generate new ID
  private generateNewId(): number {
    return this.persons.length > 0
      ? Math.max(...this.persons.map(p => p.ID)) + 1
      : 1;
  }

  // Refresh data from JSON file
  refreshData(): void {
    this.http.get<Person[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.persons = data;
        this.personsSubject.next([...this.persons]);
      },
      error: (error) => {
        console.error('Error refreshing data:', error);
      }
    });
  }
}
