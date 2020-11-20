import React, {useState} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";


const AddCategory = () =>{
    
    const [name, setName] = useState("initialState");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const {user, token} = isAuthenticated();

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3"
                to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    }

    const myCategoryForm = () =>{
        return(
            <form>
                <div className="form-group"> 
                    <p className="lead">
                        Enter the Category
                    </p>
                    <input type="text" 
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="For Ex. Summer"    
                    />
                    <button className="btn btn-outline-info">
                        Create Category
                    </button>
                </div>
            </form>
        )
    }

    return(
        <Base 
        title="Create a new category"
        description="Add a new category for new products"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {myCategoryForm()}
                    {goBack()}
                </div>
                
            </div>
        </Base>
    )
}

export default AddCategory;