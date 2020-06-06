import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private API_URL = 'https://restcountries.eu/rest/v2/all';
  public countries$ = this.http.get<ICountry>(this.API_URL);

  constructor(private http: HttpClient) {}
}
