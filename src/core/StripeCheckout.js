import React, {useState, useEffect, createRef} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";


const StripeCheckout = ({products, setReload = f => f, reload = undefined}) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    
    const getFinalAmount = () => {
        let amount = 0;
        products.map((product) => {
            amount = amount + product.price;
        });
        return amount;
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">
                Pay with Stripe
            </button>   
        ) : (
            <Link to="/signin">
                <button className="btn btn-info">Signin</button>
            </Link>
        )   
    };

    
    return(
        <div>
            <h3 className="text-white">
                Stripe Checkout
                {getFinalAmount()}
            </h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;