import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzModalModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: any[] = [];
  isVisible = false;
  currentProduct: any = {};

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }

  showModal(product?: any): void {
    this.currentProduct = product ? { ...product } : {};
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.currentProduct.id) {
      this.http.put(`http://localhost:3000/products/${this.currentProduct.id}`, this.currentProduct)
        .subscribe(() => this.loadProducts());
    } else {
      this.http.post('http://localhost:3000/products', this.currentProduct)
        .subscribe(() => this.loadProducts());
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  deleteProduct(id: number): void {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => this.loadProducts());
  }
}
