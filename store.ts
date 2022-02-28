import {configureStore} from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import loginReducer from './components/auth/loginSlice'
import userReducer from './components/user/userSlice'
import spaceReducer from './components/space/spaceSlice'
import usersReducer from './components/usersPage/usersSlice'


const store = configureStore({
    reducer: {
        login:loginReducer,
        user:userReducer,
        users:usersReducer,
        space:spaceReducer,
  
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store