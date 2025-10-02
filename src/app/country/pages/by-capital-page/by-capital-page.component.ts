import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoaading = signal(false)
  isError = signal<string|null>(null)
  countries = signal<Country[]>([])

  onSearch( query: string){
    if ( this.isLoaading() ) return;

    this.isLoaading.set(true)
    this.isError.set(null);

    this.countryService.searchByCapital( query )
      .subscribe( countries => {
        this.isLoaading.set(false)
        this.countries.set( countries )

        console.log({countries});
      });
  }
}