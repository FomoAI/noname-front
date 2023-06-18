import { useCallback , useEffect , useState} from "react"
import balanceParse from "../utils/balanceParse"
import { useDispatch } from "react-redux"
import { setUserData } from "../store/slices/authSlice"
import auth from "../services/auth"
import blockScroll from "../utils/blockScroll"
import { closeModal } from "../store/slices/modalsSlice"

export default function useAuth() {
    const dispatch = useDispatch()
    
    const disconnectHandler = useCallback(() => {
        localStorage.removeItem('userData')
        dispatch(setUserData({address:'',balance:'',isAuth:false,favourites:[]}))
    },[])

    const changeAccount = useCallback( (data = '') => {
        try{
            let address = data?.selectedAddress || data
            address = address?.address ? address.address : address
            balanceParse(address.toString()).then(async (balance) => {
                const {success,user} = await auth({address:address.toString().toLowerCase(),balance})

                const isAuth = !!user?.discordData?.username

                if(success){
                    dispatch(setUserData({...user,isAuth:isAuth}))
                }else{
                    alert('Something going wrong')
                }
            })
        }catch(error){
            console.log(error)
        }
    },[])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if(window?.ethereum?.selectedAddress !== userData?.address){
            disconnectHandler()
        }
        if(userData){
            dispatch(setUserData(userData))
        }
    },[])

  return {disconnectHandler,changeAccount}
}
