import { Component, computed, Input, OnInit } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent implements OnInit {
  @Input() country!: Country;

  currentYear = computed(() => {
    return new Date().getFullYear();
  });

  ngOnInit() {
    console.log('Emoji de bandera:', this.country.flag);
    console.log('URL de bandera SVG:', this.country.flagSvg);
  }
}