import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/notes';

const getAll = () => {
  const response = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'not saved to server',
    important: true,
  }
  return response.then((response) => response.data.concat(nonExisting));
}

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject)
  return response.then((response) => response.data);
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then((response) => response.data);
}
const noteService = { getAll, create, update, }
export default noteService;