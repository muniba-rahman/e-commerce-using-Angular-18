import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductSchema } from '../../schema/products';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule], // ye import kiya hai ta k reactive forms ka use kar sake
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit { // implements OnInit hmny add kia hy ta k jab init ho to ye function chale
  constructor() {
    this.initializeForm(); // ye function call kiya hai jo form ko initialize karega
    // ye constructor hai jo component ke load hone par chalega
    // ye constructor me koi bhi function call nahi kiya jata hai kyunki ye function tab chalega jab component load hoga
    // isliye ye function ko ngOnInit me call kiya jata hai
  } // constructor me koi bhi function call nahi kiya jata hai

  productData = signal<ProductSchema[]>([]); // ye signal hai jo data ko track karega or jab bhi data change hoga to ye update hoga

  productService = inject(ProductServiceService); // ye function call kiya hai jo api se data le raha hai
  // this is how we inject the service in the component
  // constructor(private products: ProductServiceService) { } // ye bhi ek tarika hai service ko inject karne ka but it is old

  productObject = new ProductSchema();

  productForm: FormGroup = new FormGroup({}); // ye form group hai jo form ko track karega or jab bhi form change hoga to ye update hoga

  initializeForm(){
    this.productForm = new FormGroup({
      productId: new FormControl(this.productObject.productId), // ye form control hai jo form ko track karega or jab bhi form change hoga to ye update hoga
      productName: new FormControl(this.productObject.productName, [Validators.required, Validators.minLength(4)]),
      shortName: new FormControl(this.productObject.shortName),
      category: new FormControl(this.productObject.category, Validators.required),
      sku: new FormControl(this.productObject.sku, Validators.required),
      price: new FormControl(this.productObject.price),
      thumbnailImageUrl: new FormControl(this.productObject.thumbnailImageUrl),
      deliveryTimeSpan: new FormControl(this.productObject.deliveryTimeSpan),
    });
  };

  saveProduct(){
    this.productService.postProduct(this.productForm.value).subscribe({
      next: (data: ProductSchema) => {
        console.log(this.productForm.value);
        alert(`Product Saved Successfully: ${data}`);
        this.loadProducts(); // ye function call kiya hai jo api se data le raha hai
      },
      error: (error) => {
        alert(`Failed To Save Product: ${error}`);
        console.log(error);
      }
    });
  };

  loadProducts() {
    console.log("Hello from loadProducts"); // ye function tab chalega jab component load hoga
    this.productService.getAllProducts().subscribe({
      next: (data: ProductSchema[]) => {
        console.log("Hello from product service");
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
      this.modal.nativeElement.style.display = "none";
    }
  }
}
