import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NotificationComponent} from "./notification/notification.component";
import {CommonModule, NgClass} from "@angular/common";
import {Product} from "./models/product";
import {ProductService} from "./service/product.service";
import {Store} from "@ngrx/store";
import {Observable, take} from "rxjs";
import {AuthState} from "./signals/auth/auth";
import { AppStoreModule } from './signals/signals.module';
import {login, logout} from "./signals/auth/auth.action";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent, RouterLink, NgClass,CommonModule,AppStoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-app';
  isMenuOpen = false;
  notificationMessage: string | null = null;
  featuredProducts: any[] = [];
  isLoginVisible = false;
  isAuthenticated: Observable<boolean>;
  products: Product[] = [];

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


  constructor(private productService: ProductService,private router: Router,private store: Store<{ auth: AuthState }>) {
    this.isAuthenticated = this.store.select(state => state.auth.isAuthenticated);
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
  onLogin() {
    this.store.dispatch(login());

  }

  onLogout() {
    this.store.dispatch(logout());
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // animateCartIcon() {
  //   const cartIcon = document.getElementById('cart-icon');
  //   if (cartIcon) {
  //     cartIcon.classList.add('animate-bounce');
  //     setTimeout(() => cartIcon.classList.remove('animate-bounce'), 1000);
  //   }
  // }
}
