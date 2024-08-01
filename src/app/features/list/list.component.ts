import { Component, inject } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { ProductsService } from '../../shared/services/products.service';

/* ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
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
