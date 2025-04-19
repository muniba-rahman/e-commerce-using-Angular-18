import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductSchema } from '../../schema/products';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit { // implements OnInit hmny add kia hy ta k jab init ho to ye function chale
  constructor() { } // constructor me koi bhi function call nahi kiya jata hai

  productData = signal<ProductSchema[]>([]); // ye signal hai jo data ko track karega or jab bhi data change hoga to ye update hoga

  products = inject(ProductServiceService); // ye function call kiya hai jo api se data le raha hai
  // this is how we inject the service in the component
  // constructor(private products: ProductServiceService) { } // ye bhi ek tarika hai service ko inject karne ka but it is old

  loadProducts() {
    console.log("Hello from loadProducts"); // ye function tab chalega jab component load hoga
    this.products.getAllProducts().subscribe({
      next: (data: ProductSchema[]) => {
        console.log("Hello from product service");
        console.log("loaded products: ", data);
        this.productData.set(data);
      },
      error: (err) => {
        console.error("Error loading products", err);
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // ye function call kiya hai jo api se data le raha hai
  }

  @ViewChild('newModal') modal:ElementRef | undefined;

  openModal(){
    if(this.modal){
      this.modal.nativeElement.style.display = "block";
    }
  }

  closeModal() {
    if(this.modal){
      this.modal.nativeElement.style.dispaly = "none";
    }
  }
}
