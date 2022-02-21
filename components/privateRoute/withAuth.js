import { useRouter } from "next/router";
import {useAppSelector, useAppDispatch} from '../hooks/hooks'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUserProfile } from "../user/userAction";
import { loginSuccess } from "../auth/loginSlice";
import { fetchNewAccessJWT } from "../api/userApi";


const withAuth = (WrappedComponent) => {
 

 
  return (props) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state.login);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
      const updateAccessJWT = async () => {
        const result = await fetchNewAccessJWT();
        result && dispatch(loginSuccess());
      };
  
      !user._id && dispatch(getUserProfile());
  
      !sessionStorage.getItem("accessJWT") &&
        localStorage.getItem("accounting_crm") &&
        updateAccessJWT();
  
      !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    }, [dispatch, isAuth, user._id]);
  
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();


      const accessToken = sessionStorage.getItem("accessJWT");
      
      if(!sessionStorage.getItem("accessJWT")) {
        return null
      }
      


      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;