import axios from 'axios';

export async function getLimits() {
  const response = await axios.get(
    'http://localhost:8080/fileLimit'
  );
  return response.data;
}

export async function postLimit(name) {
  const response = await axios.post(
    `http://localhost:8080/fileLimit`, name
  );
  return response;
}

export async function deleteLimit(id) {
  const response = await axios.delete(
    `http://localhost:8080/fileLimit`, id
  );
  return response;
}