import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule], // Quitar RouterLink ya que no lo usaremos
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input() show: boolean = false;
  
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}