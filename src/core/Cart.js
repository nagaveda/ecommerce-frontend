import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Payment from "./Payment";



const  Cart = () => {
  
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  
  
    useEffect(()=>{
        setProducts(loadCart());
    }, [reload]);
  const loadAllProducts = products => {
      return (
          <div>
              <h2>Your cart</h2>
              {
                  products.map((product, index)=>{
                    return <Card 
                     key={index} 
                     product={product} 
                     addtoCart={false} 
                     removeFromCart={true}   
                     setReload = {setReload}
                     reload = {reload} 
                     />;
                  })
              }
          </div>
      )
  };

  const loadCheckout = () => {
    return (
        <div>
            <StripeCheckout 
            products={products}
            setReload = {setReload}  
            reload = {reload}
            />
        </div>
    )
};
  
  return (
    <Base title="Cart" description=" Get ready to checkout right from here :)">
        <div className="row text-center">
              <div className="col-6">{
                products.length > 0 ?
                loadAllProducts(products)
                :
                (
                  <h3>No products in the cart</h3>
                )}</div>
              <div className="col-6">
              {
                loadCheckout()
                
              }
              <Payment products = {products} setReload = {setReload} reload = {reload}/>
              {/* <p>Braintree</p> */}
              </div>
        </div>
    </Base>
  );
};

export default Cart;
