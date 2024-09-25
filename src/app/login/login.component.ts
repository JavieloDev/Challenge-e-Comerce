import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {login} from "../states/auth.action";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,private store: Store) {}


  onLogin() {
    this.store.dispatch(login());
    if (this.loginForm.valid) {
      // Simula un inicio de sesión exitoso
      this.authService.login(); // Llama al método de inicio de sesión del servicio
      this.router.navigate(['products']); // Redirige a la página de productos
    } else {
      console.log('Formulario no válido');
    }
    // Aquí puedes agregar lógica adicional para autenticar al usuario.
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


}

