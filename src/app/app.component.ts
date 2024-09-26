import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NotificationComponent} from "./shared/notification/notification.component";
import {CommonModule, NgClass} from "@angular/common";
import {Product} from "./models/product";
import {ProductService} from "./service/product.service";
import {Store} from "@ngrx/store";
import {map, Observable, take} from "rxjs";
import {AuthState} from "./signals/auth/auth";
import { AppStoreModule } from './signals/signals.module';
import {login, logout} from "./signals/auth/auth.action";
import {CartState} from "./signals/car/cart.state";
import {CartService} from "./service/car.service";
import {ShortDescriptionPipe} from "./shared/pipe/short-description.pipe";
import {NotificationService} from "./service/notification.service";


export interface CartItem {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, NotificationComponent, RouterLink, NgClass, CommonModule, AppStoreModule, ShortDescriptionPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-app';
  isMenuOpen = false;
  featuredProducts: any[] = [];
  isLoginVisible = false;
  isAuthenticated: Observable<boolean>;
  products: Product[] = [];
  private _car: CartItem[] =[]


  reviews = [
    {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/150',
      location: 'New York, USA',
      comment: 'Excelente servicio y productos de alta calidad. ¡Recomiendo ampliamente esta tienda!'
    },
    {
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/150',
      location: 'London, UK',
      comment: 'Siempre encuentro lo que necesito en esta tienda. ¡Me encanta la variedad de productos!'
    },
    {
      name: 'Michael Johnson',
      avatar: 'https://via.placeholder.com/150',
      location: 'Sydney, Australia',
      comment: 'Entrega rápida y productos tal como se describen. ¡Estoy muy satisfecho con mis compras!'
    }
  ];


  constructor(private productService: ProductService,
              private router: Router,
              private store: Store<{ auth: AuthState,cart :CartState }>,
              private cartService: CartService,
              private notificationService: NotificationService) {
    this.isAuthenticated = this.store.select(state => state.auth.isAuthenticated);
    this.cartService.cartItems$.subscribe(items => {
      this._car = items;
    });
  }

  get productos(){
    return this._car
  }

  ngOnInit() {
    this.loadFeaturedProducts();

  }

  loadFeaturedProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.featuredProducts = data.filter(product => product.rating && product.rating.rate >= 3.5);
    });
  }
  handleLoginLogout() {
    this.isAuthenticated.pipe(take(1)).subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.onLogout();
        this.isLoginVisible=true;
      }
    });
  }

  handleCatalogClick() {
    this.isAuthenticated.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.showLogin();
      }else{
        this.router.navigate(['products']);
        this.isLoginVisible=true
      }
    });
  }

  showLogin() {
    this.isLoginVisible = true;
  }
  // onLogin() {
  //   this.store.dispatch(login());
  //
  // }

  onLogout() {
    this.store.dispatch(logout());
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  // viewDetails(productId: number) {
  //   this.router.navigate(['/products/details', productId]);
  // }
  // addToCart(product: Product){
  //   if (this.isAuthenticated){
  //     this.cartService.addToCart(product, this.quantity);
  //     const currentCart = this.cartService.getCartItems();
  //     if (product) {
  //       this.notificationService.showNotification(`${product.title} ha sido agregado al carrito.`);
  //       console.log(`Agregando ${this.quantity} ${product.title} al carrito`);
  //     }
  //   }else{
  //     this.notificationService.showNotification('Por favor, inicia sesión para agregar productos al carrito.');
  //   }
  // }


}
