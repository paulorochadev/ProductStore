import { Component, computed, input } from '@angular/core';

/* ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatButtonModule, MatCardModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>()

  productTitle = computed(() => this.product().title)
}
