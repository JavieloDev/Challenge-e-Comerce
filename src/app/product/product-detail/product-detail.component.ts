import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {CommonModule} from "@angular/common";
import {Product} from '../../models/product';
import {NotificationService} from "../../service/notification.service";
import {addItem} from "../../signals/car/cart.action";
import {Store} from '@ngrx/store';
import {AppStoreModule} from "../../signals/signals.module";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AppStoreModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = true;
  quantity: number = 1;
  notificationMessage: string | null = null;


  constructor(private route: ActivatedRoute, private store: Store, private productService: ProductService, private notificationService: NotificationService) {
    this.notificationService.currentNotification.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
        this.loading = false;
      }
    );
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: Product) {
    this.store.dispatch(addItem({item: product}));
    if (product) {
      this.notificationService.showNotification(`${product.title} ha sido agregado al carrito.`);
      console.log(`Agregando ${this.quantity} ${product.title} al carrito`);
    }
  }


}






