import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ShortDescriptionPipe} from "../../pipe/short-description.pipe";
import {Product} from "../../models/product";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe, RouterLink],
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
  private autoSlideSubscription?: Subscription;

  constructor(private productService: ProductService, private router: Router) {
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
    console.log('Producto agregado al carrito:', product);
  }
}
