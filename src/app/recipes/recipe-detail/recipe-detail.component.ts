import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipeAPI.model';
import { RecipeService } from '../recipe.service';
import { RecipeAPIService } from '../recipeAPI.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe;
  id: number;

  constructor(private recipeService: RecipeAPIService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeService.getRecipe(this.id).subscribe(res => {
            this.recipe = res;
          });
        }
      );
  }

  onAddToShoppingList() {
    RecipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id).subscribe((res:any) =>
    {
      console.log(res)
    });
    this.router.navigate(['/recipes']);
  }

}
