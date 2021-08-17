import React, { Component } from 'react';
import profile from "../../images/profile.jpg";
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import BlogService from '../../utils/BlogService';
import { Button } from '@material-ui/core';

class PersonBlogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.match.params.name,
            idx: this.props.match.params.idx,
            PersonBlogDetail: {},
            PersonBlogCategory: {},
        }
    }

    componentDidMount() {
        BlogService.getPersonBlogDetail(this.state.name, this.state.idx)
            .then(res => {
                console.log(res);
                this.setState({ PersonBlogDetail: res.data });
            });

        BlogService.getPersonBlogCategory(this.state.name)
            .then(res => {
                console.log(res);
                this.setState({ PersonBlogCategory: res.data });
            })
    }



    render() {
        return (
            <div>
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

                <div className="card-width">
                    <div className="cards" style={{ "width": "15rem" }}>
                        <div className="box">
                            <img className="card-img-top profile" src={profile} alt="Card image cap" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.name}</h5>
                            <p className="card-text">자기소개</p>
                            <a href="https://github.com/reoup" className="a-icons-margin"><GitHubIcon fontSize="medium" className="a-icons" /></a>
                            <a href="https://instagram.com" className="a-icons-margin"><InstagramIcon fontSize="medium" className="a-icons" /></a>
                            <a href="https://facebook.com" className="a-icons-margin"><FacebookIcon fontSize="medium" className="a-icons" /></a>
                        </div>
                    </div>
                </div>
                <div className="category">category
                    <p>-전체보기 </p>

                </div>
                <div className="title-width">
                    <div className="title">
                        <p className="title-position">{this.state.PersonBlogDetail.title}</p>
                    </div>
                    <div className="content-body">
                        <p>{this.state.PersonBlogDetail.content}</p>
                    </div>
                    <div className="content-footer">
                        <Button className="border">댓글</Button>
                        <p style={{ "display": "inline" }}>조회수: {this.state.PersonBlogDetail.hit}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonBlogComponent;