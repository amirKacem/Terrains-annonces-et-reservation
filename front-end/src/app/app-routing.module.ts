import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuardService } from './services/auth-guard.service';
import { TerrainsComponent } from './terrains/terrains.component';
import  {TerrainDetailComponent} from './terrains/terrain-detail/terrain-detail.component';
import { UserTerrainsComponent } from './user-terrains/user-terrains.component';
import { UpdateTerrainComponent } from './terrains/update-terrain/update-terrain.component';
import { UserAnnoncesComponent } from './user-annonces/user-annonces.component';
import { UpdateAnnonceComponent } from './home/update-annonce/update-annonce.component';
import { AnnonceDetailComponent } from './home/annonce-detail/annonce-detail.component';
import { UpdateUserComponent } from './update-user/update-user.component';
const routes:Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'terrains',component:TerrainsComponent,canActivate:[AuthGuardService]},
  {path:'terrain/detail/:id',component:TerrainDetailComponent,canActivate:[AuthGuardService]},
  {path:'terrain/update/:id',component:UpdateTerrainComponent,canActivate:[AuthGuardService]},
  {path:'annonce/detail/:id',component:AnnonceDetailComponent,canActivate:[AuthGuardService]},
  {path:'annonce/update/:id',component:UpdateAnnonceComponent,canActivate:[AuthGuardService]},
  {path:'mesTerrains',component:UserTerrainsComponent,canActivate:[AuthGuardService]},
  {path:'mesAnnonces',component:UserAnnoncesComponent,canActivate:[AuthGuardService]},
  {path:'user/update',component:UpdateUserComponent,canActivate:[AuthGuardService]}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
