import React, { Component } from 'react';
import CategoryBoardsAPI from '../../utils/api';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const UseStyles = makeStyles((theme) => ({
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
}));

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

    readBoard(name,idx) { // 글을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의한 것
        this.props.history.push(`/${name}/${idx}`);
    }


    render() {
        if(!this.state.categoryBoards.length)
            return <div></div>
            
        const {classes} = this.props;
        console.log(classes);

        return (
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
            </div>
            // {this.state.categoryBoards.map(
            //     categoryBoards =>
            //     <div className='customHeight'
            //     key ={categoryBoards.idx}
            //     onClick = {() => {this.readBoard(categoryBoards.name, categoryBoards.idx)}}>
            //     <div className='row'>
            //         <div className='col-sm-2 custom'>
            //             <img src={categoryBoards.img_url}
            //             width='220px'
            //             height='100%'
            //             alt='testA'/>
            //         </div>
            //         <div className='col-sm-8'>
            //             <div className=' '>
            //             <h3>{categoryBoards.title}</h3>
            //             </div>
            //             <div className="bottomGap">{categoryBoards.content}</div>
            //             <div className="under">작성자: {categoryBoards.name}  조회수: {categoryBoards.hit}</div>
            //         </div>    
            //     </div>
            // </div>
            // )}


        );
    }
}

export default CategoryListComponent;