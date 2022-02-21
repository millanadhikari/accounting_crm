
import { fetchSpaceFail, fetchSpaceLoading, fetchSpaceSuccess } from './spaceSlice';
import { getAllSpaces } from '../api/spaceApi'
import axios from 'axios';


const rootUrl = "http://localhost:3001/v1/";
const spaceUrl = rootUrl + "space/create_new";



export const fetchAllSpaces = () => async (dispatch) => {

  dispatch(fetchSpaceLoading());
  try {
    const result = await getAllSpaces();

    result.data.result.length &&
      dispatch(fetchSpaceSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchSpaceFail(error.message));
  }
};

export const createNewSpace = (frmData) => {
  console.log("from api", frmData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(spaceUrl, frmData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};