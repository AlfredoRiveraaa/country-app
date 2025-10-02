import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CountryListComponent {

  @Input()
  public countries: Country[] = [];

  trackByCca2(index: number, country: Country): string {
    return country.cca2;
  }

}