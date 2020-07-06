import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchCards } from '../redux'
import $ from 'jquery'; 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// function myFunction(e) {
//     console.log("hiii")
//     e.preventDefault();
//     $('.MuiPagination-ul li button').removeClass('Mui-selected');
//     $(this).addClass('Mui-selected');
// }


 function PaginationControlled(props) {
   
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    event.preventDefault();
    props.clickpagination(value);
    // history.push(`/ProductslistNext/${value}`)

  };

  // const handleChange = (event, value) => {
  //   event.preventDefault();
  //   props.setPage(value);

  // };

  return (
    <div className={classes.root}>
        <Pagination count={10} page={page}  onChange={handleChange} color="secondary" />
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    clickpagination: (value) => dispatch(fetchCards(value))
   };
}; 

export default connect(null,mapDispatchToProps)(PaginationControlled);