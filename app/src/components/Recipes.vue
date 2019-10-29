<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <router-link to="/recipes/add" tag="button" class="btn btn-sm new-recipe-btn">Submit New Recipe</router-link>
    <div v-for="(recipe,index) in recipes" :key="index" class="row">
      <div class="col-sm-12 recipe">
        <h2 class="text-center color-main">{{recipe.name}}</h2>
        <div class="row">
          <div class="col-sm">
            <img alt="Recipe image" :src="recipe.image" />
          </div>
          <div class="col-sm text-center">
            {{recipe.description}}
          </div>
        </div>
        <div class="row recipe-header">
          <div class="col my-auto"><span class="font-weight-bold color-secondary">Prep Time</span>: {{recipe.prepTime}}</div>
          <div class="col my-auto"><span class="font-weight-bold color-secondary">Cook Time</span>: {{recipe.cookTime}}</div>
          <div class="col my-auto"><span class="font-weight-bold color-secondary">Servings</span>: {{recipe.servings}}</div>
          <div class="col-sm-4"><h3 class="text-right color-secondary">Ingredients</h3></div>
        </div>
        <div class="row directions">
          <div class="col-sm-8">
            <h3>Directions</h3>
            <ol>
              <li v-for="(dir,idx) in recipe.directions" :key="idx">
                {{dir}}
              </li>
            </ol>
          </div>
          <div class="col-sm-4">
            <div class="row">
              <div class="col-sm-6 ingredient" v-for="(ingr,idx) in recipe.ingredients" :key="idx">
                {{ingr.amount + (ingr.measurement ? ' ' + ingr.measurement : '')}} {{ingr.name}}
              </div>
            </div>
            <!-- <ul class="list-unstyled">
              <li v-for="(ingr,idx) in recipe.ingredients" :key="idx">
                {{ingr.amount + (ingr.measurement ? ' ' + ingr.measurement : '')}} {{ingr.name}}
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recipes',
  data () {
    return {
      recipes: [
        {
          id: 1,
          name: 'One-Skillet Alfredo Chicken',
          description: 'This is a long description of how to cook chicken in a pan with pasta. It tastes good and is easy to make. Simple as that.',
          image: 'https://via.placeholder.com/800x300?text=Recipe+Image',
          prepTime: '15 min',
          cookTime: '30 min',
          servings: 6,
          instructions: 'Do this and do that...',
          ingredients: [
            {
              name: 'Chicken Breast',
              amount: 2
            },
            {
              name: 'Penne Pasta',
              amount: 1,
              measurement: 'lb'
            },
            {
              name: 'Whipping Cream',
              amount: 1.5,
              measurement: 'cup'
            },
            {
              name: 'Chicken Broth',
              amount: 4,
              measurement: 'cup'
            },
            {
              name: 'Parmesean Cheese',
              amount: 1,
              measurement: 'cup'
            }
          ],
          directions: [
            'Cook chicken in pan until brown',
            'Remove chicken then add chicken broth and simmer for 5 minutes',
            'Add pasta and cook for about 8 minutes until soft',
            'Add whipping cream and let simmer for 4 minutes'
          ]
        },
        {
          id: 2,
          name: 'Hibachi Steak',
          description: 'This is a long description of how to cook a simple japanese dish. More text. More text. Longer and longer.',
          image: 'https://via.placeholder.com/800x300?text=Recipe+Image',
          prepTime: '10 min',
          cookTime: '30 min',
          servings: 6,
          instructions: 'Do this and do that...',
          ingredients: [
            {
              name: 'Steak',
              amount: 2
            },
            {
              name: 'Basmati Rice',
              amount: 1,
              measurement: 'cup'
            },
            {
              name: 'Zucchini',
              amount: 1
            },
            {
              name: 'Onion',
              amount: 0.5
            },
            {
              name: 'Water',
              amount: 2,
              measurement: 'cup'
            }
          ],
          directions: [
            'Bring 2 cups of water to a boil in a pot',
            'Add rice to pot, turn heat down to low, and cover the pot. Let cook for 20 minutes then set it aside. Do not take the cover off.',
            'Cut up onions and zucchini',
            'Generously salt and pepper both sides of the steaks',
            'Put a large non-stick pan on medium-high heat and add 2 tsp of olive oil'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.recipes {
  position: relative;
}
.new-recipe-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #DE1B1B;
  color: #fff;
}
.recipe-header {
  border-bottom: black 2px solid;
}
.ingredient {
  font-size: 14px;
  padding: 8px 4px;
}
.recipe {
  padding: 50px 0;
  border-bottom: #87AAB9 4px solid;
}
</style>
