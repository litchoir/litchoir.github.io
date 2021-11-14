import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, throwError } from 'rxjs';
import { catchError, delay, first, mergeMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { LC_COOKIE_KEY_NAME } from '../constants/shared.constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  
  getJson() : any {
    const url = 'https://lc-admin-website-dynamic-assets.s3.amazonaws.com/data/all.json';
    return this.http.request(
      'GET',
      url
    ).pipe(
      tap(d => console.log(d)),
      first(),
      catchError(err => throwError(err))
    );
  }
  
  lchttp(method: any, path: string, body: Object | null, isPrivileged=true, delayMs=0) : Observable<any> {
    const baseUrl = 'https://skmrd5ke9j.execute-api.us-east-1.amazonaws.com';
    return this.http.request(
      method,
      `${baseUrl}/${path}`,
      { 
        ... body && { body },
        headers: { 
          ... isPrivileged && { 'Authorization': `Bearer ${
            this.cookieService.get(LC_COOKIE_KEY_NAME)
          }`},
          'Content-Type': 'application/json' 
        }
      }
    ).pipe(
      delay(delayMs),
      first(),
      catchError((err) => timer(delayMs).pipe(mergeMap(t => throwError(err))))
    )
  }

  getJSONFileContents() {
    return this.getJson();
  }
  putText(config: Object) {
    return this.lchttp(
      "PUT",
      "text", /* id doesn't necessarily have to exist */
      config
    );
  }
  putImage(config: Object) {
    return this.lchttp(
      "PUT",
      "image",
      config
    );
  }
  deleteText(config: Object) {
    return this.lchttp(
      "PUT",
      "text",
      config
    );
  }
  deleteImage(config: Object) {
    return this.lchttp(
      "DELETE",
      "image",
      config
    )
  }
}
