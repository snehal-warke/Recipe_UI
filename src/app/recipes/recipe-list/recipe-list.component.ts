import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipeAPI.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { RecipeAPIService } from '../recipeAPI.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeAPIService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe(res => {
      this.recipes = res;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
  }
}
