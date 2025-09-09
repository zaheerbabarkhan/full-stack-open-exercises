import axios from "axios";

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    const nonExisting = {
      "name": "DO Not Exist",
      "number": "39-23-6423122",
      "id": "10"
    }
    return request.then(response => response.data.concat(nonExisting))
}


const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log("inside the update object", newObject)
    const request = axios.put(`${baseURL}/${id}`, newObject)
    
    return request.then(response => response.data)
}
export default {
    getAll,
    create,
    deletePerson,
    update
}