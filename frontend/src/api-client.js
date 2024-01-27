
const  API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
console.log( API_BASE_URL)

export const register = async (formData)=>{
    const response  = await fetch('/api/users/register',{
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(formData),

    })
    const responseBody = await response.json();
    if(!response.ok)
    {
        throw new Error(responseBody.message)
    }
}
export const signIn =async (formData)=>{
    const response  = await fetch('/api/auth/login',{
        method : "POST",
        credentials:"include",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData),
    })
    const body = await response.json();
    if(!response.ok)
    {
        throw new Error(body.message)
    }
    return body;


}
export const validateToken = async ()=>{
    const response = await fetch('/api/auth/validate-token', {
        method:"GET",
        credentials:"include",

    })
    if(!response.ok){
        throw new Error("Token invalid")
    }
    return response.json()
}
export const signOut = async ()=>{
    const response = await fetch ('/api/auth/logout', {
        credentials:"include", 
        method: "POST",
    })
    if(!response.ok){
        throw new Error("Error during sign out")
    }
    // return response.json()
}