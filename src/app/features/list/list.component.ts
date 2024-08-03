import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { NoItemsComponent } from './components/no-items/no-items.component';

/* ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products'])
  productsService = inject(ProductsService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService)

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id])
  }

  onDelete(product: Product) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products.set(products)
          })
        })
      })
  }
}