import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdateRowService {
  private dataUrl = 'assets/data/olympic-athletes.json';
  private athletes: any[] = [];
  private athletesSubject = new BehaviorSubject<any[]>(this.athletes);
  public athletes$ = this.athletesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<any[]>(this.dataUrl).subscribe({
      next: (data) => {
        this.athletes = data;
        this.athletesSubject.next([...this.athletes]);
        console.log('Data loaded successfully:', data);
      },
      error: (error) => {
        console.error('Error loading data from JSON:', error);
        this.athletes = [];
        this.athletesSubject.next([]);
      }
    });
  }

  getOlympicAthletes(): Observable<any[]> {
    if (this.athletes.length > 0) {
      return this.athletes$;
    } else {
      return this.http.get<any[]>(this.dataUrl).pipe(
        tap(data => {
          this.athletes = data;
          this.athletesSubject.next([...this.athletes]);
        })
      );
    }
  }

  refreshData(): void {
    this.http.get<any[]>(this.dataUrl).subscribe({
      next: (data) => {
        this.athletes = data;
        this.athletesSubject.next([...this.athletes]);
      },
      error: (error) => {
        console.error('Error refreshing data:', error);
      }
    });
  }
}

