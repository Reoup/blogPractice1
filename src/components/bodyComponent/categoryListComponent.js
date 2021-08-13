import React, { Component } from 'react';
import CategoryBoardsAPI from '../../utils/api';
import moment from 'moment';

class CategoryListComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            category: props.match.params.category,
            categoryBoards: []
        };
    }

    _dataFormat(data, format) {
        return moment(new Date(data)).format(format);
    }
    
    initialRegistrationTime = (cTime) => {
        if(!cTime) return;
        return cTime ? this._dataFormat(cTime, 'YYYY-MM-DD') : '-';
    }

    componentDidMount() {
        CategoryBoardsAPI.getCategoryBoards(this.state.category).then((res) => {
            this.setState({categoryBoards: res.data});
        });
    }


    render() {
        if(this.state.categoryBoards.length)

        console.log(this.state.categoryBoards);
        return (
            <div>
                <div className="row">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-color text-cent">
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성일 </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.categoryBoards.map( // boards의 데이터를 출력
                        categoryBoard =>
                            <tr
                            key={categoryBoard.idx}> 
                            <td> {categoryBoard.idx} </td>
                            <td> {categoryBoard.title} </td>
                            <td> {this.initialRegistrationTime(categoryBoard.reg_dt)} </td>
                            </tr>
                        )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CategoryListComponent;