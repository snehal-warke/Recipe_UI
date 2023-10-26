import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { RecipeAPIService } from '../recipeAPI.service';
import { Recipe } from '../recipeAPI.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeAPIService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );

      this.editForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        imagePath: ['', [Validators.required]]
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value).subscribe(
        (res: any) => {
          console.log(res)
        });;
    } else {
      this.recipeService.createRecipe(this.recipeForm.value).subscribe(
        (res: any) => {
          console.log(res)
        });
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipeService.getRecipe(this.id).subscribe(
        (recipe: Recipe) => {
          if (recipe) {
            this.recipe = recipe;
            this.recipeForm.patchValue(recipe);
            recipeName = this.recipe.name;
            recipeImagePath = this.recipe.imagePath;
            recipeDescription = this.recipe.description;
            if (this.recipe['ingredients']) {
              for (let ingredient of this.recipe.ingredients) {
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  })
                );
              }
            }
            this.editForm.patchValue(recipe);
          } else {
            console.error(`Recipe with ID ${this.id + 1} not found.`);
          }
        },
        (error) => {
          console.error('Error fetching recipe:', error);
        }
      );

      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
