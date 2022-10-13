import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgyOWUwNTU3YmMxZjA3NWJmODVjOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDcxMjk0NCwiZXhwIjoxNjYwOTcyMTQ0fQ.ag1e2MxXq2C4erhBhW7wXgC9YaaTvQTFsaY9kHroJzg"


export const publicRequest = axios.create({
    baseUrl: BASE_URL,
});

export const userRequest = axios.create({
    baseUrl: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});