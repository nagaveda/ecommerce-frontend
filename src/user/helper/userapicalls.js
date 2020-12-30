import { isAuthenticated } from "../../auth/helper"
import { API } from "../../backend"



export const updateProfile = (userId, token, user) => {
    return fetch(`${API}/user/update/${userId}`, {
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getProfile = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getMyOrders = (userId, token) => {
    return fetch(`${API}/orders/user/${userId}`, {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("RESP",response);
        return response.json();
    })
    .catch(err => console.log(err));
}