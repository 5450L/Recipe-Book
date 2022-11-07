import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvTe6LxA6ZduTcx7V8kGMkNpHJ86sKWdg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown erroroccured!';
          if (!error.error.error || !error.error) {
            return throwError(errorMessage);
          }

          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'User with such email already exists';
          }

          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvTe6LxA6ZduTcx7V8kGMkNpHJ86sKWdg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown erroroccured!';
          if (!error.error.error || !error.error) {
            return throwError(errorMessage);
          }

          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'User with such email already exists';
          }

          return throwError(errorMessage);
        })
      );
  }
}
