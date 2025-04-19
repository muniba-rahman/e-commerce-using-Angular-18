import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

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
