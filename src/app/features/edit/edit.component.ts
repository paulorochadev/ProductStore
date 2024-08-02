import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';

/* ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  productsService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)
  product: Product = inject(ActivatedRoute).snapshot.data['product']

  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    })
  })
  
  onSubmit(){
    this.productsService.put(this.product.id, {
      title: this.form.controls.title.value
    })
    .subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso!', 'Ok')

      this.router.navigateByUrl('/')
    })
  }
}
