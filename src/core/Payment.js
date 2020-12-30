import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";

import DropIn from "braintree-web-drop-in-react";

const Payment = ({products, setReload = f => f, reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error:"",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token)
        .then(info => {
            console.log("INFO", info);
            if(info.error){
                setInfo({
                    ...info,
                    error: info.error
                })
            }
            else{
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
    };

    const showDropIn = () => {
        return(
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                    (
                        <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-outline btn-success btn-block" onClick={onPurchase}>Buy</button>
                        </div>
                    ) :
                    (
                        <div>
                            <h3>Please login or add something to cart</h3>
                        </div>
                    )
                }
            </div>
        )
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);


    const onPurchase = () => {
        setInfo({loading: true});
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce : nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response => {
                setInfo({...info, success: response.success, loading: false});
                console.log("PAYMENT SUCCESS");
                console.log("TESTTT", response);
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    status:"Processing"
                };
                createOrder(userId, token, orderData);
                cartEmpty(()=>{
                    console.log("Emptied the cart...!");
                });
                
                setReload(!reload);
            })
            .catch(err =>{
                console.log(err);
                setInfo({loading: false, success: false});
                console.log("PAYMNET FAILEd");

                
            });
        })
        .catch(err => console.log(err))
          
    }

    const getAmount = () => {
        let amount = 0;
        products.map(product => {
            amount = amount + product.price;
        });
        return amount;
    }

    return(
        <div>
            <p>Paypal checkout</p>
            <p>Your Bill: $ {getAmount()}</p>
            {showDropIn()}
        </div>
    );
};

export default Payment;