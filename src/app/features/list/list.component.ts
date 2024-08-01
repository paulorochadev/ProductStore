import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../shared/interfaces/product';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

/* ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  
  products: Product[] = [];

  productsService = inject(ProductsService);

  ngOnInit(){
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    })
  }
}
