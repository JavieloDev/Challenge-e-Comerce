import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
      category: this.categories,
      priceRange: [''],
    });
  }

  onClose() {
    this.closeDrawer.emit();
  }

  applyFilters() {
    this.filterChange.emit(this.filterForm.value);
  }
}
