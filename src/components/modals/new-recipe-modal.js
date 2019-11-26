import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import classNames from 'classnames'

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
            newDirection: '',
            selectedTab: 'info'
        }

        this.handleChangeRecipeProp = this.handleChangeRecipeProp.bind(this);
        this.handleSaveNewRecipe = this.handleSaveNewRecipe.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.getTabContent = this.getTabContent.bind(this);
        this.handleNewDirectionChange = this.handleNewDirectionChange.bind(this);
        this.handleAddNewDirection = this.handleAddNewDirection.bind(this);
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

    handleChangeTab(tab) {
        this.setState({
            selectedTab: tab.toLowerCase()
        });
    }

    handleNewDirectionChange(e) {
        this.setState({
            newDirection: e.target.value
        });
    }

    handleAddNewDirection() {
        let recipe = this.state.recipe;
        recipe.directions.push(this.state.newDirection);
        this.setState({
            recipe,
            newDirection: ''
        });
    }

    getTabContent() {
        switch (this.state.selectedTab.toLowerCase()) {
            case 'info':
                return (
                    <div className="recipe-info-tab">
                        <label>Recipe Name</label>
                        <input type="text" id="newrecipe-name" className="form-control" placeholder="Recipe Name" value={this.state.recipe.name} onChange={(e) => this.handleChangeRecipeProp('name', e.target.value)} />
                        <label>Description</label>
                        <textarea id="newrecipe-desc" className="form-control" placeholder="Description" value={this.state.recipe.description} onChange={(e) => this.handleChangeRecipeProp('description', e.target.value)}></textarea>
                        <label>Shortened Description</label>
                        <input type="text" id="newrecipe-shortdesc" className="form-control" placeholder="Short Description" value={this.state.recipe.shortDescription} onChange={(e) => this.handleChangeRecipeProp('shortDescription', e.target.value)} />
                        <label>Banner Image</label>
                        <input type="text" id="newrecipe-image" className="form-control" placeholder="http://example.com/image.jpg" value={this.state.recipe.image} onChange={(e) => this.handleChangeRecipeProp('image', e.target.value)} />
                        <div className="row">
                            <div className="col-4">
                                <label>Prep Time</label>
                                <div className="input-group">
                                    <input type="number" id="newrecipe-prep-time" className="form-control" placeholder="Prep Time" aria-label="Prep Time" aria-describedby="basic-addon2" value={this.state.recipe.prepTime} onChange={(e) => this.handleChangeRecipeProp('prepTime', e.target.value)} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">minutes</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <label>Cook Time</label>
                                <div className="input-group">
                                    <input type="number" id="newrecipe-cook-time" className="form-control" placeholder="Cook Time" aria-label="Cook Time" aria-describedby="basic-addon2" value={this.state.recipe.cookTime} onChange={(e) => this.handleChangeRecipeProp('cookTime', e.target.value)} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">minutes</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <label>Servings</label>
                                <input type="number" id="newrecipe-servings" className="form-control" value={this.state.recipe.servings} onChange={(e) => this.handleChangeRecipeProp('name', e.target.value)} />
                            </div>
                        </div>
                    </div>
                )
            case 'directions':
                return (
                    <div className="recipe-direction-tab">
                        <label>Directions</label>
                        <ol>
                            {
                                (this.state.recipe.directions || []).map((dir, idx) =>
                                    <li key={idx}>
                                        {dir}
                                    </li>
                                )
                            }
                        </ol>
                        <hr />
                        <div className="input-group">
                            <textarea className="form-control" placeholder="Directions" value={this.state.newDirection} onChange={this.handleNewDirectionChange}></textarea>
                            <div className="input-group-append">
                                <span className="input-group-text add-recipe-direction" onClick={this.handleAddNewDirection}>Add</span>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    render() {
        let tabs = ['Info', 'Directions', 'Ingredients'];
        let self = this;
        return (
            <Modal
                title="Add new recipe"
                showModal={this.props.showModal}
                onClose={this.props.onClose}
                onSave={this.handleSaveNewRecipe} >
                <div className="new-recipe-modal">
                    <ul className="nav nav-tabs">
                    {
                        tabs.map((tab, idx) => {
                            let classes = classNames({
                                'nav-link': true,
                                'active': self.state.selectedTab.toLowerCase() === tab.toLowerCase()
                            });
                            return (
                                <li key={idx} className="nav-item">
                                    <a className={classes} href="#" onClick={() => self.handleChangeTab(tab)}>{tab}</a>
                                </li>
                            );
                        })        
                    }
                    </ul>
                    {self.getTabContent()}
                </div>
            </Modal>
        );
    }
};

export default NewRecipeModal;