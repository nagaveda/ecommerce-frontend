import {API} from '../../backend';

//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(resp => {
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
};

//get all categories
 export const getCategories = () =>{
     return fetch(`${API}/categories`, {
         method: "GET"
     })
     .then(resp => {
         return resp.json();
     })
     .catch(err=>console.log(err));
 }

//product calls

//create a product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err));

};

//get all products
export const getProducts = () =>{
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(resp => {
        return resp.json();
    })
    .catch(err=>console.log(err));
};

//delete a product

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=> console.log(err));

};

//get a product

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(prod => {
        return prod.json();
    })
    .catch(err=> console.log(err));
}

//update a product

export const updateProduct = (userId, token, productId, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err=> console.log(err));
};
