import axios from 'axios';

export const initialAPI = axios.create({
    baseURL: 'https://api.chucknorris.io/',
})

export const jokeAPI = {
    getJoke() {
        return initialAPI.get<JokeType>('jokes/random')
    }
}

 export type JokeType = {
    icon_url: string
    id: string,
    url: string,
    value: string
}
