import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipeAPI.model';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeAPIService {
  private apiUrl = 'https://localhost:44348/api';

  constructor(private http: HttpClient) {}

  // Get all Recipes
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes/GetAllRecipe`);
  }

  // Create a new Recipe
  createRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes/CreateRecipe`, recipe);
  }

  // Get a Recipe by ID
  getRecipe(recipeId: number) {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/GetRecipe/${recipeId}`);
  }

  // Update a Recipe by ID
  updateRecipe(recipeId: number, recipe: Recipe) {
    recipe.recipeId = recipeId;
    return this.http.put<Recipe>(`${this.apiUrl}/recipes/UpdateRecipe/${recipeId}`, recipe);
  }

  // Delete a Recipe by ID
  deleteRecipe(recipeId: number) {
    return this.http.delete(`${this.apiUrl}/recipes/DeleteRecipe/${recipeId}`);
  }
}
