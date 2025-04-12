import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
//usecontext hook can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.
export const AppContext = createContext()

// multiple components can share and update common data — like user, isSeller, and navigate — without prop drilling.
export const AppContextProvider =({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [CartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("")
    //add product to cart
    const addToCart = (itemId)=>{
        //The global structuredClone () method creates a deep clone of a given value using the structured clone algorithm
        let cardData = structuredClone(CartItems);
        if(cardData[itemId]){
            cardData[itemId] +=1;
        }else{
            cardData[itemId] = 1;
        }
        setCartItems(cardData);
        //add the notification
        toast.success("Added to Cart")
    }

    //Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) =>{
        let cardData = structuredClone(CartItems);
        cardData[itemId] = quantity;
        setCartItems(cardData);
        toast.success("Cart Updated")
    }

    //remove product from card
    const removeFromCart = (itemId)=>{
        let cardData = structuredClone(CartItems);
        if(cardData[itemId]){
            cardData[itemId] -=1;
            if(cardData[itemId]===0){
                delete cardData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cardData);
    }
    //function to calculate total cart items
    const getCartCount = () =>{
        let totalCount =0;
        for(const item in CartItems){
            totalCount += CartItems[item]
        }
        return totalCount;
    }
    //function that will return total cart amount
    const getCartAmount = () =>{
        let totalAmount =0;
        for(const items in CartItems){
            let itemInfo = products.find((product)=>product._id===items)
            if(CartItems[items]> 0){
                totalAmount += itemInfo.offerPrice * CartItems[items]
            }
        }
        return Math.floor(totalAmount*100)/100;
    }

    //function that will fetch products from assets
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
    }
    //now we have to call the fetch products whenever component gets loaded, for that we will use useEffect
    useEffect(()=>{
        fetchProducts()
    }, [])
    //after that we have to export products using this value object
    const value = {navigate,user, setUser, setIsSeller, isSeller , showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, CartItems, setSearchQuery, searchQuery, getCartAmount, getCartCount
    }
    //we can access this state variables in any other component
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

//now to access appcontext we need to export this from file
export const useAppContext =()=>{
    return useContext(AppContext)
}
//now we can use useAppContext in any other component and we can directly access data stored in value object
