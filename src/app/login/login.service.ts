import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, delay, first, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'https://skmrd5ke9j.execute-api.us-east-1.amazonaws.com/login';
  private delayMs = 500;
  constructor(private http: HttpClient) {}
  postLogin(password: string): Observable<any> {
    return this.http.post(
      this.url,
      { password },
      { headers: { 'Content-Type': 'application/json' }}
    ).pipe(
      delay(this.delayMs),
      first(),
      catchError((err) => timer(this.delayMs).pipe(mergeMap(t => throwError(err))))
    );
  }
}

