import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  filterForm: FormGroup;
  @Input() categories :string[] = [];
  @Output() filterChange = new EventEmitter<any>();
  @Output() closeDrawer = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: [this.categories,[Validators.required]],
      priceRange: ['',[Validators.required]],
    });
  }

  onClose() {
    this.closeDrawer.emit();
  }

  applyFilters() {
    if (this.filterForm.valid) {
      this.filterChange.emit(this.filterForm.value);
    }else {
      console.log('Formulario no válido');
    }
  }
}
