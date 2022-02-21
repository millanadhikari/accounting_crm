import axios from "axios";

const rootUrl = "http://localhost:3001/v1/";
const spacesUrl = rootUrl + "space/all";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";

export const getAllSpaces = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(spacesUrl, {
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