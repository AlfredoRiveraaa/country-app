import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
})
export class CountryListComponent {

  @Input()
  public countries: Country[] = [];

  @Input()
  public errorMessage: string|unknown|null = '';

  @Input()
  public isLoading: boolean = false;

  @Input()
  public isEmpty: boolean = false;

  trackByCca2(index: number, country: Country): string {
    return country.cca2;
  }

}