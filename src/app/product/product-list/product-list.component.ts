import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ShortDescriptionPipe} from "../../shared/pipe/short-description.pipe";
import {Product} from "../../models/product";
import {interval, Subscription} from "rxjs";
import {CartService} from "../../service/car.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DrawerComponent} from "../../shared/drawer/drawer.component";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe, RouterLink, DrawerComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  @ViewChild('carousel') carouselElement!: ElementRef;
  productsByCategory: { [key: string]: Product[] } = {};
  categories: string[] = [];
  products: Product[] = [];
  featuredProducts: Product[] = [];
  currentSlide = 0;
  quantity: number = 1;
  private autoSlideSubscription?: Subscription;
  filteredProducts: Product[] = [];
  showDrawer: boolean = false;


  constructor(private productService: ProductService, private router: Router, private cartService: CartService, private notificationService: NotificationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateCarousel();
      this.startAutoSlide();
    }, 0);
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.groupProductsByCategory(this.products);
        this.featuredProducts = this.products.slice(0, 5);
        setTimeout(() => this.updateCarousel(), 0);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  groupProductsByCategory(products: Product[]) {
    this.productsByCategory = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });

    this.categories = Object.keys(this.productsByCategory);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.featuredProducts.length) % this.featuredProducts.length;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.featuredProducts.length;
    this.updateCarousel();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    if (this.carouselElement && this.carouselElement.nativeElement) {
      const carousel = this.carouselElement.nativeElement;
      const slideWidth = carousel.offsetWidth / 3;
      carousel.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    }
  }

  startAutoSlide() {
    this.autoSlideSubscription = interval(3000).subscribe(() => {
      this.nextSlide();
    });
  }

  stopAutoSlide() {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  viewDetails(productId: number) {
    this.router.navigate(['/products/details', productId]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantity);

    // this.store.dispatch(addItem({item: product}));
    const currentCart = this.cartService.getCartItems();
    if (product) {
      this.notificationService.showNotification(`${product.title} ha sido agregado al carrito.`);
      console.log(`Agregando ${this.quantity} ${product.title} al carrito`);
    }
  }

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  onFilterChange(filters: any) {
    const {category, priceRange} = filters;
    console.log(filters)
    const [minPrice, maxPrice] = priceRange && priceRange.match(/^\d+-\d+$/)
      ? priceRange.split('-').map(Number)
      : [null, null];

    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = category ? product.category === category : true;
      const matchesPriceRange = priceRange ? (product.price >= minPrice && product.price <= maxPrice) : true;
      console.log(matchesCategory, matchesPriceRange)
      return matchesCategory && matchesPriceRange;
    });
    console.log(this.filteredProducts)
    if (this.filteredProducts.length === 0) {
      this.filteredProducts = this.products;

    }else {
      this.categories = [category]
      this.productsByCategory[category] = this.filteredProducts;
    }
  }

  onDrawerClose() {
    this.showDrawer = false;
    this.loadProducts()

  }

}
