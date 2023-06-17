import axios from 'axios';

const BASIC_URL = 'http://localhost:3001/api/persons';
const getAll = async() => {
  const request = await axios.get(BASIC_URL);
  return request.data;
}
const addPerson = async (newPerson) => {
  const request = await axios.post(BASIC_URL, newPerson);
  return request.data;
}
const deletePerson = async (id) => {
  const request = await axios.delete(`${BASIC_URL}/${id}`);
  return request.data;
}
const update = async (id, updatedPerson) => {
  const request = await axios.put(`${BASIC_URL}/${id}`, updatedPerson);
  return request.data
}
const personServices = { getAll, addPerson, deletePerson, update, };
export default personServices;