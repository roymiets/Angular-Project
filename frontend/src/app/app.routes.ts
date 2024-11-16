import { Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'About', component: AboutPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'productform', component: ProductFormComponent },
    { path: 'productlist', component: ProductListComponent }

];
