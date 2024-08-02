import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ajoutez cette ligne
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent], // Ajoutez FormsModule ici
  template: `
    <section>
      <form (submit)="filterLocations($event)">
        <input type="text" placeholder="Filter by city" [(ngModel)]="filter" name="filter"/>
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  filter: string = '';

  constructor() {
    this.loadHousingLocations();
  }

  async loadHousingLocations() {
    this.housingLocationList = await this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterLocations(event: Event) {
    event.preventDefault();
    if (this.filter) {
      this.filteredLocationList = this.housingLocationList.filter(location =>
        location.city.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredLocationList = this.housingLocationList;
    }
  }
}
