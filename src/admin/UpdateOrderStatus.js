import React, {useState, useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrderStatus, updateOrderStatus } from "./helper/adminapicall";


const UpdateOrderStatus = ({match}) => {
    
    const [status, setStatus] = useState('');
    const {user, token} = isAuthenticated();    

    const preload = () => {
        getOrderStatus(user._id, token,match.params.orderId )
        .then(response=>{
            console.log("STATUSS", response.status);
            setStatus(response.status);
        })
        .catch(err=>console.log(err));
    }

    const onSubmit = () => {
        
        updateOrderStatus(user._id, token, match.params.orderId, {status: status})
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err));
    };


    const handleChange = (event) =>  {
        setStatus(event.target.value);
    }

    useEffect(()=>{
       preload();
    }, []);

    return(
        <Base 
        title="Update Order Status" 
        description="Admin can update the status of the orders here.. "
        >
            Update the order status
            <form>
                <div className="form-group"> 
                    <p className="lead">
                        Enter the Status
                    </p>
                    <input type="text" 
                    className="form-control my-3"
                    onChange={handleChange}
                    value={status}
                    autoFocus
                    required
                    placeholder="Enter status"    
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">
                        Update Status
                    </button>
                </div>
            </form>
        </Base>
    );
};

export default UpdateOrderStatus;