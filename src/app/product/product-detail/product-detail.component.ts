import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {CommonModule} from "@angular/common";
import {Product} from '../../models/product';
import {NotificationService} from "../../service/notification.service";
import {CartService} from "../../service/car.service";


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productId!: number;
  quantity: number = 1;
  loading = true;
  notificationMessage: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private notificationService: NotificationService, private cartService: CartService) {
    this.notificationService.currentNotification.subscribe(message => {
      this.notificationMessage = message;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.quantity = +queryParams.get('quantity')!;
    });

    this.loadProduct(this.productId);
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
    this.cartService.addToCart(product, this.quantity);
    const currentCart = this.cartService.getCartItems();
    if (product) {
      this.notificationService.showNotification(`${product.title} ha sido agregado al carrito.`);
    }
  }

}






