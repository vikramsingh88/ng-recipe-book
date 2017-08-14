import {NgModule} from '@angular/core';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {RecipeService} from '../recipes/recipe.service';
import {ServerService} from '../recipes/server.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth.service';
import {AuthGuard} from '../auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports : [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [RecipeService, ShoppingListService, ServerService, AuthService, AuthGuard],
})
export class CoreModule {

}
