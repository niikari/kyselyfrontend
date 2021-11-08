import axios from 'axios';
const baseUrl = 'https://kyselybackend123.herokuapp.com/api/answers'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
  }
  
const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(res => res.data);
}

const getByUrl = (url) => {
  const request = axios.get(url);
  return request.then(res => res.data);
}

  const createMakersAnswer = (url, newObject) => {
    const request = axios.post(url, newObject);
    console.log('vastaus makerille');
    console.log(url);
    console.log(newObject);
    return request.then(response => response.data);
  }

  
  const create = () => {
    const request = axios.post(baseUrl, {});
    console.log('luodaan answer');
    return request.then(response => response.data);
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
  
  export default {getAll, create, deleteObject, modify, getById, getByUrl, createMakersAnswer}