import {API} from '../../backend';

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
}