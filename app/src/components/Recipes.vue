<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <div v-for="(recipe,index) in recipes" :key="index" class="row">
      <div class="col-sm-12">
        <h2 class="text-center">{{recipe.name}}</h2>
        <div class="row">
          <div class="col-sm">
            <img :src="recipe.image" />
          </div>
          <div class="col-sm text-center">
            {{recipe.description}}
          </div>
        </div>
        <div class="row recipe-header">
          <div class="col-sm my-auto"><span class="font-weight-bold">Prep Time</span>: {{recipe.prepTime}}</div>
          <div class="col-sm my-auto"><span class="font-weight-bold">Cook Time</span>: {{recipe.cookTime}}</div>
          <div class="col-sm my-auto"><span class="font-weight-bold">Servings</span>: {{recipe.servings}}</div>
          <div class="col-sm"><h3>Ingredients</h3></div>
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
        }
      ]
    }
  }
}
</script>

<style scoped>
.recipe-header {
  border-bottom: #800000 2px solid;
}
.ingredient {
  font-size: 12px;
}
</style>
