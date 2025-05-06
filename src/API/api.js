import axios from "axios"

export const ApiCEP = axios.create({
    baseURL: 'https://viacep.com.br',
})