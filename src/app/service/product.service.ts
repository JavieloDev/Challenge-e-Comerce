import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsWithDetails(): Observable<any[]> {
    return this.getProducts().pipe(
      mergeMap((products: Product[]) => {
        // Array para cada producto
        const productDetailRequests = products.map(product =>
          this.getProductById(product.id).pipe(
            map(productDetails => ({
              ...product,
              details: productDetails,
            }))
          )
        );

        // Epero a completar los observables
        return forkJoin(productDetailRequests);
      })
    );
  }

  getProductsGroupedByRating(): Observable<{ [key: number]: Product[] }> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      mergeMap(products => {
        const groupedProducts: { [key: number]: Product[] } = {};
        products.forEach(product => {
          const rating = Math.round(product.rating.rate);
          if (rating > 3) {
            if (!groupedProducts[rating]) {
              groupedProducts[rating] = [];
            }
            groupedProducts[rating].push(product);
          }
        });

        return [groupedProducts];
      })
    );
  }
}
