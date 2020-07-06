import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

function ProductslistNext() {
    const history = useHistory();
    return (
        <div class="next-page">
            <h2>Coming soon</h2>
            <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
                Back to home page
            </Button>
        </div>
    )
}

export default ProductslistNext
