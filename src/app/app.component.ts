import {AfterViewInit, Component, effect} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NotificationComponent} from "./shared/notification/notification.component";
import {CommonModule, NgClass} from "@angular/common";
import {Product} from "./models/product";
import {ProductService} from "./service/product.service";
import {CartService} from "./service/car.service";
import {ShortDescriptionPipe} from "./shared/pipe/short-description.pipe";
import {NotificationService} from "./service/notification.service";
import {cartSignal} from './signals/car/cart.state';
import {AuthService} from "./service/auth.service";
import {MenuService} from "./service/menu.service";


export interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, RouterLink, NgClass, CommonModule, ShortDescriptionPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'e-commerce-app';
  isMenuOpen = false;
  featuredProducts: any[] = [];
  isLoginVisible = false;
  products: Product[] = [];
  cartCount = 0;
  productsByRating: { [key: number]: Product[] } = {};
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
              private cartService: CartService,
              private authService: AuthService,
              private menuService: MenuService,
              private notificationService: NotificationService) {

    effect(() => {
      const cartItems = cartSignal();
      this.cartCount = cartItems.length;
    });

  }

  ngAfterViewInit() {
    const notification = new NotificationComponent();
    this.notificationService.registerNotification(notification);
  }


  ngOnInit() {
    this.loadFeaturedProducts();
    this.productService.getProductsGroupedByRating().subscribe(
      (groupedProducts) => {
        this.productsByRating = groupedProducts;
      },
      (error) => {
        console.error('Error fetching products by rating:', error);
      }
    );

  }

  loadFeaturedProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.featuredProducts = data.filter(product => product.rating && product.rating.rate >= 3.5);
    });
  }

  handleLoginLogout() {
    if (!this.isAuthenticated) {
      this.login();
      this.isLoginVisible = true;
    } else {
      this.logout()
      console.log('autenticado')
      this.isLoginVisible = false;
    }
  }

  login() {
    this.authService.login();
  }


  logout() {
    this.authService.logout();
  }


  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  handleCatalogClick() {
    if (!this.isAuthenticated) {
      this.showLogin();
      console.log('NO autenticado')
    } else {
      this.router.navigate(['products']);
      this.isLoginVisible = true;
      console.log('Autenticado')
    }
  }

  showLogin() {
    this.isLoginVisible = true;
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.menuService.menuIn();
    } else {
      this.menuService.menuOut();
    }
  }


}
