import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Bande {
  id: number;
  parcelleId: number;
  number: number;
  largeur: number;
  longueur: number;
}

export interface Parcelle {
  id: number;
  nom: string;
  nombreBande: number;
}

interface ApiResponse<T> {
  data: T[];
}

interface SimpleApiResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ParcelleService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = 'http://localhost:3000/api/parcelles';

  getParcelles(): Observable<ApiResponse<Parcelle>> {
    return this.http.get<ApiResponse<Parcelle>>(`${this.API_URL}`);
  }

  getBandes(parcelleId: number): Observable<ApiResponse<Bande>> {
    return this.http.get<ApiResponse<Bande>>(
      `${this.API_URL}/${parcelleId}/bandes`
    );
  }

  createParcelle(parcelle: {
    nom: string;
    largeur: number;
    longueur: number;
  }): Observable<SimpleApiResponse<Parcelle>> {
    return this.http.post<SimpleApiResponse<Parcelle>>(
      `${this.API_URL}`,
      parcelle
    );
  }
}
