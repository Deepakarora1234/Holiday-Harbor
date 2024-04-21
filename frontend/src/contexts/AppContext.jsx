import React ,{useContext, useState} from "react"
import Toast from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from "../api-client.js"
import { loadStripe } from "@stripe/stripe-js"; 

const STRIPE_PUB_KEY = "pk_test_51P24TZSCGEvzC7HS0ILDrhpbicJz5kcbkJbbL9JO1t3WiQ57I3RwgoBrMHXYGZTZ9NnPNNYCBbAu6Xcf73DVtJfL00ed6c9l7w"

const AppContext = React.createContext(undefined)

const stripePromise = loadStripe(STRIPE_PUB_KEY);


export const AppContextProvider = ({children})=>{

    const [toast, setToast] = useState(undefined)
    const {isError} = useQuery("validateToken", apiClient.validateToken,{
            retry : false
    })

    return (
        <AppContext.Provider value = {{
            showToast:(toastMessage)=>{
                setToast(toastMessage)
                // console.log(toastMessage)
            },
            isLoggedIn : !isError,
            stripePromise
        }}>
        {toast && <Toast  message = {toast.message} type = {toast.type} onClose = {()=>{setToast(undefined)}}/>}
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    return context 
}