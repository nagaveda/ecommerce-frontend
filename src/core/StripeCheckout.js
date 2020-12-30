import React, {useState, useEffect, createRef} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import Stripecheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";


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

    const makePayment = (token) => {
        const body = {
            token,
            products
        };
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })
        .then(response => {
            //  console.log(response);   
             // call furthur
             const {status} = response;
             console.log("STATUS", status);
             cartEmpty(()=>{
                 console.log("Emptied the cart..!");
                 setReload(!reload);
             });
        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <Stripecheckout 
            stripeKey="pk_test_51I1uftKu3498s3qiCYmr5xPA6icms8MSTVE5CwbfhjFBLZ43H2afTzy47kNgGuywEfxSXXQuibQY9rAnNyPMLyuG0026VdjTvu"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Pay with stripe"
            shippingAddress
            billingAddress
            
            >
                <button className="btn btn-success">
                    Pay with Stripe
                </button>   
            </Stripecheckout>
            
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
                {/* {getFinalAmount()} */}
            </h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;