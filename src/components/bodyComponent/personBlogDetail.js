import React, { Component } from 'react';

class PersonBlogComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.match.params.name,
            idx: this.props.match.params.idx
        }
    }
    render() {
        console.log(this.state.name);
        console.log(this.state.idx);
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-dark">
                        <div>
                            <a href="http://localhost:3000" className="navbar-brand">Blog 연습중</a>
                        </div>
                        <h2 className="text-center">{this.state.name}의 블로그</h2>
                    </nav>
                </header>
                
            </div>
        );
    }
}

export default PersonBlogComponent;