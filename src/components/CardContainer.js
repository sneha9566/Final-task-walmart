import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux'
import PaginationControlled from './Pagination'
import { fade , makeStyles , withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase from './firebase'


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    '& > *': {
      marginTop: theme.spacing(2),
    }
  },
  search: {
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    width:'80%!important',
    borderRadius: '20px!important',
    backgroundColor: '#fff!important',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0cb64',
    borderBottomLeftRadius: '20px',
    borderTopLeftRadius: '20px',
    padding: '0 15px',
    color:'#000!important',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }), 
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
  
function CardContainer (props) {
  console.log('props: ', props);
  const { cardData, fetchCards, history } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [cards, setCards] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [price, setPrice] = useState(false);
  const [rating, setRating] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openedit, setOpenedit] = React.useState(false);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenedit = () => {
    setOpenedit(true);
  };
  const handleCloseedit = () => {
    setOpenedit(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardClickHandler = (getuser) => {
    history.push("/Productsdetails/" + getuser.productId , {getuser: getuser});
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);


  const searchHandler = (term) => {
    axios.get(`https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/3?search=${term}&inStock=${true}`)
      .then(response => {
        setCards(response.data.products);
      }, error => {
        console.log(error);
      })
  }

  const searchHandlerinstock = (term, stockStatus) => {
    axios.get(`https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/3?search=${term}&inStock=${stockStatus}`)
      .then(response => {
        setCards(response.data.products);
      }, error => {
        console.log(error);
      })
  }
  const searchHandlerprice = (min,max) => {
    axios.get(`https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/10?minPrice=${min}&maxPrice=${max}&inStock=true&minReviewCount=2`)
      .then(response => {
        setCards(response.data.products);
      }, error => {
        console.log(error);
      })
  }
  const searchHandlerrating = (rating) => {
    axios.get(`https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/2/5?inStock=true&minReviewRating=${rating}`)
      .then(response => {
        setCards(response.data.products);
      }, error => {
        console.log(error);
      })
  }
  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
    searchHandler(e.target.value);
  }

  const inStockChangeHandler = (e) => {
    console.log(e.target.checked);
    setInStock(e.target.checked);
    searchHandlerinstock('', e.target.checked);
  }
  const priceChangeHandler = (e) => {
    console.log(e.target.checked);
    setPrice(e.target.checked);
    searchHandlerprice('', e.target.checked);
  }
  const ratingChangeHandler = (e) => {
    console.log(e.target.checked);
    setRating(e.target.checked);
    searchHandlerrating('', e.target.checked);
  }

  useEffect(() => {
    fetchCards()
  }, []);

  useEffect(() => {
    setCards(cardData.cards);
  }, [cardData])
  


  return cardData.loading ? (
    <Container fixed className="skeleton-img">
    <Skeleton variant="text" />
    <Skeleton variant="circle" width={100} height={100} />
    <Skeleton variant="rect" width={1200} height={508} />
  </Container>
    
  ) : cardData.error ? (
    
    <h2>{cardData.error}</h2>
    
  ) : (


  <div>
    <div>
      
      {/* <TextField id="outlined-search" className="mg-top40" label="Search field" type="search" value={searchInput}
      onChange={(e) => inputChangeHandler(e)} variant="outlined" /> */}
    
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>    
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filter By category
        </DialogTitle>
        <DialogContent dividers>
       <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={inStock}
                onChange={inStockChangeHandler}
                label="InStock"
                inputProps={{ 'aria-label': 'secondary checkbox' }   
              } 
              /> 
            }
            label="Instock"           
          />  
           <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={price}
                onChange={priceChangeHandler}
                inputProps={{ 'aria-label': 'secondary checkbox' }   
              } 
              /> 
            }
            label="Price (min : 200 to max : 5000)"            
          />  
            <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={rating}
                onChange={ratingChangeHandler}
                inputProps={{ 'aria-label': 'secondary checkbox' }   
              } 
              /> 
            }
            label="Rating max 4"         
          /> 
        </DialogContent>
      </Dialog>
      </Dialog>
      <Dialog open={openedit} onClose={handleCloseedit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit shortDescription</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
     <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <FilterListIcon variant="outlined" onClick={handleClickOpen}  className="fiter-icon"/>
          </IconButton>
          <div className={classes.search} >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase value={searchInput}
              onChange={(e) => inputChangeHandler(e)} variant="outlined"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
           
          </div>
          <Button  onClick={logout} className="logoutbtn">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className="parent-card">    
        {
        cards &&    
        cards.map(card => <div className="card-box">{     
          <React.Fragment key={card.productId}>           
            <Card className={classes.root} >
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton variant="outlined" onClick={handleClickOpenedit}  aria-labelledby="form-dialog-title">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={card.productName}
                        subheader="September 14, 2016"
                      />
                      <div onClick={() => cardClickHandler(card)} className="short-desc">
                      <CardMedia
                        className={classes.media}
                        image="https://i.ibb.co/WzKrhhB/960x0.jpg"
                        title="walmart"
                      />
                      <CardContent >
                        <Typography variant="body2" color="textSecondary" component="p">
                        {card.shortDescription}
                        </Typography>
                      </CardContent>
                      <CardContent className="card-info">
                        <Typography variant="body2" color="textSecondary" component="h2">
                        Price : {card.price}
                       
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">
                          Rating : {card.reviewRating} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">
                          Review Count : {card.reviewCount} 
                        </Typography>
                      </CardContent>
                      </div>
                    
                    </Card>
            {/* </Container> */}
          </React.Fragment>   
          }</div>)
          }
      </div>
          <PaginationControlled/>
      </div>  
      
  )
  async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

const mapStateToProps = state => {
  return {
    cardData: state.card
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCards: () => dispatch(fetchCards())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer)
