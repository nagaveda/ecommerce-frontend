import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {Link} from 'react-router-dom';
import { getProfile, updateProfile } from "./helper/userapicalls";
import { isAuthenticated, signout } from "../auth/helper";

const UpdateUser = () =>{

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });
    
    const {name, email, password, error, success} = values;
    
    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    };

    const preload = () => {
        getProfile(user._id, token)
        .then(data=>{
            console.log("PROFILE...", data);
            setValues({
                ...values,
                name: data.name,
                email: data.email
            });
        })
        
    };

    useEffect(()=>{
        preload();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false});
        updateProfile(user._id, token, {name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success: false})
            }
            else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                });
                signout(()=>{
                    console.log("User Signed out.. ")
                })
            }
        })
        .catch(console.log("Error in updation"));
    }

    const UpdationForm = () =>{
        return(
            <div classname="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                             className="form-control" 
                             onChange={handleChange("name")} 
                             value={name}
                             type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                             className="form-control" 
                             onChange={handleChange("email")} 
                             value={email}
                             type="email"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    
                    </form>
                </div>

            </div>
        )
    }

    const successMessage = () => {
        return(
            <div classname="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                    style={{display:success ? "" : "none"}}
                    >
                        Profile updated successfully. Please <Link to="/signin">Login again</Link>
                    </div>  
                </div>
            </div>
        )
    }
    const errorMessage = () => {
        return(
            <div classname="row">
                <div className="col-md-6 offset-sm-3 text-left mt-3">
                    <div className="alert alert-danger"
                    style={{display:error ? "" : "none"}}>
                        {error}
                    </div>  
                </div>      
            </div>      
        )
    }
    return(
        <Base title="Update Profile" description="You can update your profile here...">
            <Link className="btn btn-info" to={`/user/dashboard`}>
                <span className="">User Dashboard</span>
            </Link>
            {UpdationForm()}
            {successMessage()}
            {errorMessage()}            
        </Base>
    )
};

export default UpdateUser;
