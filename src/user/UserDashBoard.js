import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
    
    const {user : {name, email, role}} = isAuthenticated();

    const userLeftSide = () =>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    User Navigation
                </h4>
                <ul className="list-group">
                    
                    <li className="list-group-item">
                        <Link to="/user/update" className="nav-link text-success">Manage Profile</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/orders" className="nav-link text-success">My Orders</Link>
                    </li>
                    
                        
                        
                </ul>

            </div>
        )
    }

    const userRightSide = () =>{
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name: </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email: </span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-info">User Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base
            title="Welcome to User panel"
            description="Manage your profile here"
            className="container bg-success p-4"
            >
            <div className="row">
                <div className="col-3">
                    {userLeftSide()}
                </div>
                <div className="col-9">
                    {userRightSide()}
                </div>
            </div>
            
            


        </Base>
    )
};

export default UserDashBoard;