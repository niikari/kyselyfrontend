import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/makers'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
  }
  
const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(res => res.data);
}

  const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    console.log('newObject on');
    console.log(newObject);
    return request.then(response => console.log(response.data));
  }
  
  const deleteObject = id =>  {
    console.log(`${baseUrl}/${id}`)
    const request = axios.delete(`${baseUrl}/${id}`);
    console.log(request.then(response => response.data));
    return request.then(response => response.data);
  }
  
  const modify = newObject => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
    return request.then(response => response.data);
  }
  
  export default {getAll, create, deleteObject, modify, getById}