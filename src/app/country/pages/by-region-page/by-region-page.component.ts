import { Component, inject, signal, OnInit } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { NgFor, NgIf } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [CountryListComponent, NgFor, NgIf],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = signal<Region>('Americas');

  ngOnInit(): void {
    // Obtener el query param y establecer la región inicial
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
    const initialRegion = validateQueryParam(queryParam);
    
    this.selectedRegion.set(initialRegion);
    this.onRegionSelected(initialRegion);
  }

  onRegionSelected(region: Region) {
    this.selectedRegion.set(region);

    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByRegion(region).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
        this.router.navigate(['/country/by-region'], { queryParams: { region } });
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set('Error al cargar los países');
        this.router.navigate(['/country/by-region'], { queryParams: { region } });
      }
    });
  }
}