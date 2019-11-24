import React, {Component} from 'react';

class RecipeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="recipe-card" onClick={this.props.handleClick}>
                <img alt="Recipe image" src={this.props.recipe.image} height="300px" width="300px" />
                <div className="recipe-card-footer">
                    <h5 className="text-center color-main">{this.props.recipe.name}</h5>
                    <p>{this.props.recipe.shortDescription}</p>
                </div>
            </div>
        )
    }
};

export default RecipeCard;