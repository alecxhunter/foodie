import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

class NewRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                name: '',
                description: '',
                shortDescription: '',
                image: '',
                prepTime: 0,
                cookTime: 0,
                servings: 0,
                instructions: '',
                directions: []
            },
            newDirection: ''
        }

        this.handleSaveNewRecipe = this.handleSaveNewRecipe.bind(this);
    }

    handleChangeRecipeProp(prop, val) {
        let recipe = this.state.recipe;
        recipe[prop] = val;
        this.setState({
            recipe
        });
    }

    handleSaveNewRecipe() {
        this.props.onSave(this.state.recipe);
    }

    render() {
        return (
            <Modal
                showModal={this.props.showModal}
                onClose={this.props.onClose}
                onSave={this.handleSaveNewRecipe} >
                <h3>Add a New Recipe</h3>
                <label>Recipe Name</label>
                <input type="text" id="newrecipe-name" className="form-control" placeholder="Recipe Name" value={this.state.recipe.name} onChange={(e) => this.handleChangeRecipeProp('name', e.target.value)} />
                <label>Description</label>
                <textarea id="newrecipe-desc" className="form-control" placeholder="Description" value={this.state.recipe.description} onChange={(e) => this.handleChangeRecipeProp('description', e.target.value)}></textarea>
                <label>Shortened Description</label>
                <input type="text" id="newrecipe-shortdesc" className="form-control" placeholder="Short Description" value={this.state.recipe.shortDescription} onChange={(e) => this.handleChangeRecipeProp('shortDescription', e.target.value)} />
                <label>Banner Image</label>
                <input type="text" id="newrecipe-image" className="form-control" placeholder="Image URL" value={this.state.recipe.image} onChange={(e) => this.handleChangeRecipeProp('image', e.target.value)} />
                <label>Prep Time</label>
                <div className="input-group">
                    <input type="number" id="newrecipe-prep-time" className="form-control" placeholder="Prep Time" aria-label="Prep Time" aria-describedby="basic-addon2" value={this.state.recipe.prepTime} onChange={(e) => this.handleChangeRecipeProp('prepTime', e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">minutes</span>
                    </div>
                </div>
                <label>Cook Time</label>
                <div className="input-group">
                    <input type="number" id="newrecipe-cook-time" className="form-control" placeholder="Cook Time" aria-label="Cook Time" aria-describedby="basic-addon2" value={this.state.recipe.cookTime} onChange={(e) => this.handleChangeRecipeProp('cookTime', e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">minutes</span>
                    </div>
                </div>
                <label>Servings</label>
                <input type="number" id="newrecipe-servings" className="form-control" value={this.state.recipe.servings} onChange={(e) => this.handleChangeRecipeProp('name', e.target.value)} />
                <label>Instructions</label>
                <textarea id="newrecipe-instructions" className="form-control" placeholder="Instructions" value={this.state.recipe.instructions} onChange={(e) => this.handleChangeRecipeProp('instructions', e.target.value)}></textarea>
                <label>Directions</label>
                <ol>
                {
                    (this.state.recipe.directions || []).map((dir, idx) =>
                        <li key={idx}>
                            <textarea className="form-control" placeholder="Directions" value={dir}></textarea>
                        </li>
                    )
                }
                    <li>
                        <textarea className="form-control" placeholder="Directions" value={this.state.nextDirection}></textarea>
                    </li>
                </ol>
            </Modal>
        );
    }
};

export default NewRecipeModal;