import React, { Component } from 'react';

class passBlogListComponent extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.history.push('/category/Food');
  }
  render() {
    return (
      <div className="btn-custom">
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-dark">
            <div>
              <a href="http://localhost:3000" className="navbar-brand">Blog 연습중</a>
            </div>
            <h2 className="text-center2">블로그 시작하기</h2>
          </nav>
        </header>
        <button className="btn btn-primary" onClick={this.handleChange}>블로그 시작하기</button>
      </div>
    );
  }
}

export default passBlogListComponent;