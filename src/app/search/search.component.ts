import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log('Search Query:', this.searchForm.value.query);
      // Aquí puedes despachar una acción para buscar productos usando NGRX
    }
  }
}
