import React, { Component } from 'react';
import RecipeCard from '../components/recipe-card';
import NewRecipeModal from '../components/modals/new-recipe-modal';

class Recipes extends Component {
    constructor() {
        super();

        console.log('recipes loading');

        this.state = {
            recipes: [
                {
                  id: 1,
                  name: 'One-Skillet Alfredo Chicken',
                  description: 'This is a long description of how to cook chicken in a pan with pasta. It tastes good and is easy to make. Simple as that.',
                  shortDescription: 'This is a short description of how to cook alfredo chicken.',
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
                  shortDescription: 'This is a short description of how to cook hibachi steak.',
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
            ],
            showRecipeDetails: false,
            highlightedRecipe: null,
            showModal: false
        }

        this.handleClickRecipeCard = this.handleClickRecipeCard.bind(this);
        this.handleCloseNewRecipe = this.handleCloseNewRecipe.bind(this);
        this.handleSaveNewRecipe = this.handleSaveNewRecipe.bind(this);
        this.handleClickNewRecipeBtn = this.handleClickNewRecipeBtn.bind(this);
    }

    handleClickRecipeCard(recipe) {
        this.setState({
            showRecipeDetails: true,
            highlightedRecipe: recipe
        });
    }

    handleCloseNewRecipe() {
        this.setState({
            showModal: false
        });
    }

    handleSaveNewRecipe(recipe) {
        console.log('Recipes.handleSaveNewRecipe');
        console.log(JSON.stringify(recipe));
        
        this.setState({
            showModal: false
        });
    }

    handleClickNewRecipeBtn() {
        this.setState({
            showModal: true
        });
    }

    render() {
        let self = this;
        let details = self.state.showRecipeDetails ? 
            <div className="recipe-details row">
                <div className="col-12 recipe">
                    <h2 className="text-center color-main">{self.state.highlightedRecipe.name}</h2>
                    <div className="row">
                        <div className="col-sm">
                            <img alt="Recipe image" src={self.state.highlightedRecipe.image} />
                        </div>
                        <div className="col-sm text-center">
                            {self.state.highlightedRecipe.description}
                        </div>
                    </div>
                    <div className="row recipe-header">
                        <div className="col my-auto"><span className="font-weight-bold color-main">Prep Time</span>: {self.state.highlightedRecipe.prepTime}</div>
                        <div className="col my-auto"><span className="font-weight-bold color-main">Cook Time</span>: {self.state.highlightedRecipe.cookTime}</div>
                        <div className="col my-auto"><span className="font-weight-bold color-main">Servings</span>: {self.state.highlightedRecipe.servings}</div>
                        <div className="col-sm-4"><h3 className="text-right color-main">Ingredients</h3></div>
                    </div>
                    <div className="row directions">
                        <div className="col-8">
                            <h3>Directions</h3>
                            <ol>
                            {
                                self.state.highlightedRecipe.directions.map((dir, idx) =>
                                    <li key={idx}>
                                        {dir}
                                    </li>
                                )
                            }
                            </ol>
                        </div>
                        <div className="col-4">
                            <div className="row">
                            {
                                self.state.highlightedRecipe.ingredients.map((ingr, idx) =>
                                    <div className="col-6 ingredient" key={idx}>
                                        {ingr.amount + (ingr.measurement ? ' ' + ingr.measurement : '')} {ingr.name}
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div> : '';
        return (
            <div className="recipes">
                <button className="btn btn-sm btn-primary new-recipe-btn" type="button" onClick={this.handleClickNewRecipeBtn}>Submit New Recipe</button>
                {details}
                <div className="row">
                {
                    this.state.recipes.map(recipe => 
                        <div className="col-auto" key={recipe.id}>
                            <RecipeCard recipe={recipe} handleClick={() => self.handleClickRecipeCard(recipe)} />
                        </div>
                    )
                }
                </div>
                <NewRecipeModal
                    showModal={this.state.showModal}
                    onClose={this.handleCloseNewRecipe}
                    onSave={this.handleSaveNewRecipe}
                />
            </div>
        )
    }
}

export default Recipes;