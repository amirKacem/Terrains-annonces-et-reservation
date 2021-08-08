import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule,HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddAnnonceComponent } from './home/add-annonce/add-annonce.component';
import { TerrainsComponent } from './terrains/terrains.component';
import { AddTerrainComponent } from './terrains/add-terrain/add-terrain.component';

import { TerrainDetailComponent } from './terrains/terrain-detail/terrain-detail.component';
import { UserTerrainsComponent } from './user-terrains/user-terrains.component';
import { UserAnnoncesComponent } from './user-annonces/user-annonces.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateTerrainComponent } from './terrains/update-terrain/update-terrain.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    AddAnnonceComponent,
    TerrainsComponent,
    AddTerrainComponent,
    TerrainDetailComponent,
    UserTerrainsComponent,
    UserAnnoncesComponent,
    SidebarComponent,
    UpdateTerrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
