import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationDTO, AuthenticationResponseDTO } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  doLogin(dto: AuthenticationDTO): Observable<any> {
    return this.httpClient.post<AuthenticationResponseDTO>("http://localhost:8080/api/auth", dto)
    .pipe(
      map(res => {
        this.localStorageService.set('jwt_token', res.jwtToken);
        return true;
      })
    );
  }

  ping(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/auth/ping");
  }
}
