import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NotificationComponent} from "./notification/notification.component";
import {CommonModule, NgClass} from "@angular/common";
import {Product} from "./models/product";
import {ProductService} from "./service/product.service";
import {Store} from "@ngrx/store";
import {Observable, take} from "rxjs";
import {AuthState} from "./states/auth";
import { AppStoreModule } from './states/states.module';
import {login, logout} from "./states/auth.action";

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
      // Filtrar productos con un rating alto (ejemplo: mayor o igual a 4)
      this.featuredProducts = data.filter(product => product.rating && product.rating.rate >= 4);
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
        this.showLogin(); // Llama a la función showLogin si no está autenticado
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
    this.store.dispatch(login()); // Dispatch la acción de login
    // this.isLoginVisible = false;
  }

  onLogout() {
    this.store.dispatch(logout()); // Dispatch la acción de logout
  }

  // login() {
  //   this.isLoginVisible = false;
  //   console.log(this.isAuthenticated)
  // }
  // logout() {
  //   this.store.dispatch(logout()) // Cambia a false al cerrar sesión
  //   // Aquí podrías agregar lógica adicional para manejar el cierre de sesión
  //   console.log(this.isAuthenticated)
  // }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  animateCartIcon() {

    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('animate-bounce');
      setTimeout(() => cartIcon.classList.remove('animate-bounce'), 1000); // Duración de la animación
    }
  }
}
