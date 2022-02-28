import axios from "axios";

const rootUrl = "http://localhost:3001/v1/";
const usersUrl = rootUrl + "user/all";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";
const addUserUrl = rootUrl + 'user'


export const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(usersUrl, {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        });
  
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const createNewUser = (frmData:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.post(addUserUrl, frmData, {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        });

        resolve(result);
      } catch (error) {
                reject(error);
      }
    });
  };