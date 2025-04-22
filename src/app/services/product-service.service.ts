import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSchema } from '../schema/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  baseUrl: String = "https://projectapi.gerasim.in/api/";

  constructor(private http: HttpClient) { } // called as dependency injection

  getAllProducts() :Observable<ProductSchema[]> { // yaha hmny bataya ki ye function kesa Observable return karega
    return this.http.get<ProductSchema[]>(`${this.baseUrl}Products?pageNumber=1&pageSize=100`); // ye api se data le raha hai or data ko ProductSchema ki type me convert kar raha hai
  };

  getSingleProduct(id: number) :Observable<ProductSchema> { // yaha hmny bataya ki ye function kesa Observable return karega
    return this.http.get<any>(`${this.baseUrl}Products/getSingleProduct?id=${id}`); // ye api se data le raha hai or data ko ProductSchema ki type me convert kar raha hai
  };

  postProduct(data: ProductSchema) :Observable<ProductSchema>{
    return this.http.post<ProductSchema>(`${this.baseUrl}Products`, data);
  };

  editProduct(data: ProductSchema) :Observable<ProductSchema>{
    return this.http.put<ProductSchema>(`${this.baseUrl}Products`, data);
  };

  deleteProduct(id: number) :Observable<ProductSchema>{
    return this.http.delete<any>(`${this.baseUrl}Products/deleteProduct?id=${id}`);
  };
}
 