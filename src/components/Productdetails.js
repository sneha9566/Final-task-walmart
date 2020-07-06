import React from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
function Productdetails(props) {
  const history = useHistory();
  console.log('user props: ', props);
    const {getuser} = props.location.state;
    console.log('getuser data: ', getuser);
   
    return (
      <div className="horizontal">
        <Container fixed >
          <h2>{getuser.productName}</h2>
                  <img src="https://i.ibb.co/WzKrhhB/960x0.jpg"/>
                  <p>{getuser.longDescription}</p> 
          </Container>
          <Button variant="contained" color="secondary" onClick={() =>  history.push('/')}>
                Back to home page
          </Button>
      </div>
     
    )
}


export default Productdetails
