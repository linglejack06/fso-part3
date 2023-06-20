import axios from 'axios';

const BASIC_URL = '/api/persons';
const getAll = () => {
  return axios.get(BASIC_URL)
    .then((response) => response.data)
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