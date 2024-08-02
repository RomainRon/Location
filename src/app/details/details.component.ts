import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
    </article>
  `,
  styles: [`
    .listing-photo {
      height: 600px;
      width: 50%;
      object-fit: cover;
      border-radius: 30px;
      float: right;
    }
    .listing-heading {
      font-size: 48pt;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .listing-location::before {
      content: url('/assets/location-pin.svg') / '';
    }
    .listing-location {
      font-size: 24pt;
      margin-bottom: 15px;
    }
    .listing-features > .section-heading {
      color: var(--secondary-color);
      font-size: 24pt;
      margin-bottom: 15px;
    }
    .listing-features {
      margin-bottom: 20px;
    }
    .listing-features li {
      font-size: 14pt;
    }
    li {
      list-style-type: none;
    }
    .listing-apply .section-heading {
      font-size: 18pt;
      margin-bottom: 15px;
    }
    label, input {
      display: block;
    }
    label {
      color: var(--secondary-color);
      font-weight: bold;
      text-transform: uppercase;
      font-size: 12pt;
    }
    input {
      font-size: 16pt;
      margin-bottom: 15px;
      padding: 10px;
      width: 400px;
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: solid .3px;
    }
    @media (max-width: 1024px) {
      .listing-photo {
        width: 100%;
        height: 400px;
      }
    }
  `]
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  async loadHousingLocation() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingLocation = await this.housingService.getHousingLocationById(housingLocationId);
  }
}
