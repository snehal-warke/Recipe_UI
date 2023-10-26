export class Recipe {
    recipeId: number;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
  }

  export class Ingredient {
    ingredientId: number;
    name: string;
    amount: number;
  }