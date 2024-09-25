import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductDetails(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
