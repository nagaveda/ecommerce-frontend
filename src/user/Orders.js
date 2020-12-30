import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import Card from "../core/Card";
import { getMyOrders } from "./helper/userapicalls";



const Orders = () => {
    
    const [myOrders, setMyOrders] = useState([]);
    // const [error, setError] = useState('');
    const {user, token} = isAuthenticated();

    const preload = () => {
        getMyOrders(user._id, token)
        .then(data => {
            if(data.error){
                // setError(data.error);
                console.log(data.error);
            }
            
            setMyOrders(data);
        })
    };

    useEffect(()=>{
        preload();
    }, []);
    
    return(
        <Base 
        title="My orders"
        description="You can find all your orders details here">
            <Link className="btn btn-info" to={`/user/dashboard`}>
                <span className="">User Dashboard</span>
            </Link>
            {
                
                myOrders.length !== 0 ?
                myOrders.map((order, index) => {
                    return (
                        <div key={index} className="text-center" >
                            Customer name: {order.user.name}<br/>
                            Status: {order.status}<br/>
                            Transaction ID: {order.transaction_id}<br/>
                            Total Amount: {order.amount}
                            <h3>Items: </h3>
                        {
                            order.products.map((product, idx)=>{
                                return (
                                    <div className="col d-flex justify-content-center" key={idx} style={{height:"50%", width:"50%", margin:"20px", display:"block", marginLeft:"auto", marginRight:"auto"}}>
                                        <Card product={product} addtoCart={false} />
                                    </div>
                                )
                            })
                        }    
                        <hr color="silver"/>
                        </div>
                    )
                })
                :
                <div>
                    <h3 className="text-white text-center">No orders!</h3>
                </div>
            }
        </Base>
    );
};

export default Orders;