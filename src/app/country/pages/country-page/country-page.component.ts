import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent { 
  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  countryCode = this.route.snapshot.params['code'];
  
  // Signals para el estado (igual que antes)
  country = signal<any>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadCountry();
  }

  loadCountry() {
    this.loading.set(true);
    this.error.set(null);
    
    this.countryService.searchCountryByAlphaCode(this.countryCode)
      .pipe(
        tap(country => {
          this.country.set(country);
          this.loading.set(false);
        }),
        catchError(err => {
          this.error.set('No se encontró el país');
          this.loading.set(false);
          return of(null);
        })
      )
      .subscribe();
  }
}