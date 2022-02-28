import { getUsersPending, getUsersSuccess, getUsersFail, createUserLoading, createUserFail, createUserSuccess } from "./usersSlice";
import { getAllUsers } from "../api/usersApi";
import { createNewUser } from "../api/usersApi";



export const fetchAllUsers = () => async (dispatch) => {

  dispatch(getUsersPending());
  try {
    const result = await getAllUsers();

    result.data.result.length &&
      dispatch(getUsersSuccess(result.data.result));
  } catch (error) {
    dispatch(getUsersFail(error.message));
  }
};


export const addUser = (frmData) => async (dispatch) =>  {
  dispatch(createUserLoading())
  try { 
    const result = await createNewUser(frmData)
    console.log(result.status)
    result.status == 200 &&
    dispatch(createUserSuccess())
    return {success:"true"}
    
  } catch (error) {
    dispatch(createUserFail())
  }

}