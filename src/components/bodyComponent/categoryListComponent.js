import React, { Component } from 'react';

class CategoryListComponent extends Component {
    constructor(props){
        super(props);

        console.log(props);
        this.state = {
            title: props.match.params.category
        }
    }
    render() {
        return (
            <div>
                {this.state.title}
            </div>
        );
    }
}

export default CategoryListComponent;