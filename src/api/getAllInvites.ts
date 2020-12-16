import axios from 'axios';
import {obj} from './requestObject';
const apiUrl = "https://quinncareapidev.azurewebsites.net/api/graph";
function getAllInvites(numberOfEntries) {
    return new Promise((resolve, reject) => {
        try {
          const response = axios.post(apiUrl, {...obj, MaxItemCount: numberOfEntries});
          return resolve(response);
        } catch (err) {
          return reject(err);
        }
      });
}

export default getAllInvites;