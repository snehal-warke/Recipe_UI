import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
 }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book.firebaseio.com/recipes.json?auth=' + token).pipe(map(
      (response: Response) => {
        const recipes: Recipe[] = JSON.parse(response.json.toString());
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
      }
    )
  }
}
