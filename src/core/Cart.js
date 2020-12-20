import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";



const  Cart = () => {
  
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  
  
    useEffect(()=>{
        setProducts(loadCart());
    }, [reload]);
  const loadAllProducts = () => {
      return (
          <div>
              <h2>Load products</h2>
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
              <div className="col-6">{loadAllProducts()}</div>
              <div className="col-6">{loadCheckout()}</div>
        </div>
    </Base>
  );
};

export default Cart;
