import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import Card from "../core/Card";
import ImageFetcher from "../core/helper/ImageFetcher";
import { getOrders, updateOrderStatus } from "./helper/adminapicall";


const ManageOrders = () => {
    
    const {user, token} = isAuthenticated();
    const [orders, setOrders] = useState([]);

    

    const loadOrders = () => {
        getOrders(user._id, token)
        .then(data=>{
            console.log("ORDERS..", data);
            setOrders(data);
        })
        .catch(err=>{
            console.log(err);
        });
    };

    useEffect(()=>{
        loadOrders();
    }, []);

    return (
        <Base title="Manage Orders" description="Manage your orders here!">
            <div style={{justifyContent:"center", display:"flow"}}>
            <h2 className="text-white text-center"><p>All orders</p></h2>
            {   
                orders.length!==0 ?
                orders.map((order, index) => {
                    return (
                        <div key={index} className="text-center" >
                            Customer name: {order.user.name}<br/>
                            Status: {order.status}<br/>
                            Transaction ID: {order.transaction_id}<br/>
                            Total Amount: {order.amount}
                            <Link to={`/admin/order/update/${order._id}`}>
                                <button style={{margin:"20px"}} className="btn btn-info ">Change Status</button>
                            </Link>
                            <h3>Products: </h3>
                        {
                            order.products.map((product, idx)=>{
                                return (
                                    <div className="col d-flex justify-content-center" key={idx} style={{height:"50%", margin:"20px"}}>
                                        <Card  product={product} addtoCart={false} />
                                    </div>
                                )
                            })
                        }    
                        <hr color="silver"/>
                        </div>
                        
                    )

                })
                :
                (
                    <div>
                        <h3 className="text-center text-white">No Orders.</h3>
                    </div>
                )
            
            }
            
            
            
        </div>
        </Base>
        
    )
};

export default ManageOrders;