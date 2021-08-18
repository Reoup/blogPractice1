import React, { Component } from 'react';
import BlogService from '../../utils/BlogService';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import camera from '../../images/camera.jpg';
import food from '../../images/food.jpg';
import IT from '../../images/IT.jpg';
import sports from '../../images/sports.jpg';
import travel from '../../images/travel.jpg';
import profile from '../../images/profile.jpg';


const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});


class CategoryListComponent extends Component {
    images = [
        {
            url: '/food.jpg',
            title: 'Food',
            width: '20%',
        },
        {
            url: '/travel.jpg',
            title: 'Travel',
            width: '20%',
        },
        {
            url: '/camera.jpg',
            title: 'Camera',
            width: '20%',
        },
        {
            url: '/IT.jpg',
            title: 'IT',
            width: '20%',
        },
        {
            url: '/sports.jpg',
            title: 'Sports',
            width: '20%',
        },
    ];



    constructor(props) {
        super(props);

        this.state = {
            p_num: 1,
            paging: {},
            category: props.match.params.category,
            categoryBoards: [],
            button: '로그인',
            loginName: '로그인을 해주세요'
        };
    }

    _dataFormat(data, format) {
        return moment(new Date(data)).format(format);
    }

    initialRegistrationTime = (cTime) => {
        if (!cTime) return;
        return cTime ? this._dataFormat(cTime, 'YYYY-MM-DD') : '-';
    }

    componentDidMount() {
        BlogService.getCategoryBoards(this.state.category, this.state.p_num).then((res) => {
            this.setState({
                p_num: res.data.pageNum,
                paging: res.data,
                categoryBoards: res.data.list
            });
        });
    }

    personBlogChangeHandler(name, idx) { // 글을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의한 것
        BlogService.BlogBoardsHitUp(idx)
            .then(res => {
            })
            .then(this.props.history.push(`/${name}/${idx}`))

    }

    buttonName = (event) => {
        if (event === '로그인') {
            this.props.history.push('/login');
            this.setState({
                loginName: '',
                button: '로그아웃'
            });
        }
        else {
            this.setState({
                loginName: '로그인을 해주세요',
                button: '로그인'
            });
        }
    }

    listBoard(p_num) {
        if (p_num !== this.state.p_num)
            BlogService.getCategoryBoards(this.state.category, p_num).then((res) => {
                console.log(res);
                this.setState({
                    p_num: res.data.pageNum,
                    paging: res.data,
                    categoryBoards: res.data.list
                });
            });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.navigateFirstPage; i <= this.state.paging.navigateLastPage; i++) {
            pageNums.push(i);
        }

        return (pageNums.map((page) =>
            <li className="page-item" key={page.toString()} >
                <a className="page-link" onClick={() => this.listBoard(page)}>{page}</a>
            </li>
        ));
    }

    isPagingPrev() {
        if (this.state.paging.prePage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.pageNum - 1))} tabIndex="-1">Previous</a>
                </li>
            );
        }
        else {
            return (
                <li className="page-item">
                    <a href="javascript:void(0)" className="page-link" tabIndex="-1">Previous</a>
                </li>
            );
        }
    }

    isPagingNext() {
        if (this.state.paging.nextPage) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.pageNum + 1))} tabIndex="-1">Next</a>
                </li>
            );
        }
        else {
            return (
                <li className="page-item">
                    <a href="javascript:void(0)" className="page-link" tabIndex="-1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
        else {
            return (
                <li className="page-item">
                    <a href="javascript:void(0)" className="page-link" tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pages) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.pages))} tabIndex="-1">LastPage({this.state.paging.pages})</a>
                </li>
            );
        }
        else {
            return (
                <li className="page-item">
                    <a href="javascript:void(0)" className="page-link" tabIndex="-1">LastPage({this.state.paging.pages})</a>
                </li>
            );
        }
    }

    render() {
        if (!this.state.categoryBoards.length)
            return <div></div>

        const { classes } = this.props;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-dark">
                        <div>
                            <a href="http://localhost:3000" className="navbar-brand">Blog 연습중</a>
                        </div>
                        <h2 className="text-center">{this.state.loginName}</h2>
                        <button className="btn btn-info btn-custom2" onClick={() => { this.buttonName(this.state.button) }}>{this.state.button}</button>
                    </nav>
                </header>
                <div className={classes.root}>
                    {this.images.map((image) => (
                        <Button
                            focusRipple
                            key={image.title}
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            href={`/category/${image.title}`}
                            style={{
                                width: image.width,
                            }}
                        >
                            <span
                                className={classes.imageSrc}
                                style={{
                                    backgroundImage: `url(${image.url})`,
                                }}
                            >
                            </span>
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                >
                                    {image.title}
                                    <span className={classes.imageMarked} />
                                </Typography>
                            </span>

                        </Button>
                    ))}
                    <ul className="container">
                        {this.state.categoryBoards.map(
                            categoryBoards =>
                                <li className="li-custom" key={categoryBoards.idx}>
                                    <a target="_blank" onClick={() => { this.personBlogChangeHandler(categoryBoards.name, categoryBoards.idx) }} className="a-color">
                                        <div className="img_thumb"><img src={categoryBoards.img_url} width="128" height="128" className="thumb_g" alt="왜 안떠?" /></div>
                                        <div className="wrap-cont">
                                            <div className="wrap_data">
                                                <dl className="list_data">
                                                    <dt className="screen_out">카테고리</dt>
                                                    <dd className="txt_cate txt_cate_type1">
                                                        <span className="inner_data">{categoryBoards.category}</span>
                                                    </dd>
                                                </dl>
                                                <dl className="list_data">
                                                    <dt className="screen_out">게시된 시간</dt>
                                                    <dd>{this.initialRegistrationTime(categoryBoards.reg_dt)}</dd>
                                                </dl>
                                                <dl className="list_data">
                                                    <dt>조회수</dt>
                                                    <dd className="num_cmt">{categoryBoards.hit}</dd>
                                                </dl>
                                            </div>
                                            <strong className="desc_tit">
                                                <span className="inner_desc_tit">{categoryBoards.title}</span>
                                            </strong>
                                            <p className="desc_g">{categoryBoards.content}</p>
                                            <div className="info_g">
                                                <HomeIcon className="a-icons" />
                                                <span className="txt_id">{categoryBoards.name}의 테크 블로그</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                        )}
                    </ul>
                </div>
                <div className="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(CategoryListComponent);