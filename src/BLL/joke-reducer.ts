import {Dispatch} from 'redux';
import {jokeAPI, JokeType} from '../API/joke-api';

const initialState: InitialStateType = {
    newJoke: {} as JokeType,
    favoriteJokes: [] as JokeType[],
    error: '',
    isFetching: false
}
const JOKE_SET_NEW_JOKE = 'JOKE_SET_NEW_JOKE'
const JOKE_SET_ERROR = 'JOKE_SET_ERROR'
const JOKE_REMOVE_FAVORITE_JOKE = 'JOKE_REMOVE_FAVORITE_JOKE'
const JOKE_SET_IS_FETCHING = 'JOKE_SET_IS_FETCHING'
const JOKE_SET_FAVORITE_JOKE = 'JOKE_SET_FAVORITE_JOKE'
const JOKE_CLEAR_FAVORITE_JOKES = 'JOKE_CLEAR_FAVORITE_JOKES'


export const JokeReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case JOKE_SET_NEW_JOKE:
        case JOKE_SET_ERROR:
        case JOKE_REMOVE_FAVORITE_JOKE:
        case JOKE_SET_IS_FETCHING:
            return {
                ...state,
                ...action.payload
            }
        case JOKE_SET_FAVORITE_JOKE:
            return {
                ...state,
                favoriteJokes: [...action.payload.joke]
            }
        case JOKE_CLEAR_FAVORITE_JOKES:
            return {...state, favoriteJokes: []}
        default:
            return state
    }
}

export const setNewJoke = (newJoke: JokeType) => {
    return {
        type: JOKE_SET_NEW_JOKE,
        payload: {
            newJoke
        }
    } as const
}

export const removeFavoriteJoke = (filteredJokes: JokeType[]) => {
    return {
        type: JOKE_REMOVE_FAVORITE_JOKE,
        payload: {
            favoriteJokes: filteredJokes
        }
    } as const
}

export const setSavedFavoriteJokes = (joke: JokeType[]) => {
    return {
        type: JOKE_SET_FAVORITE_JOKE,
        payload: {
            joke
        }
    } as const
}

export const clearFavoriteJokes = () => {
    return {
        type: JOKE_CLEAR_FAVORITE_JOKES,
    } as const
}

export const setIsFetching = (isFetching: boolean) => {
    return {
        type: JOKE_SET_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const
}

export const setError = (error: string) => {
    return {
        type: JOKE_SET_ERROR,
        payload: {
            error
        }
    } as const
}

export const getRandomJoke = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setIsFetching(true))
        const joke = await jokeAPI.getJoke()
        dispatch(setNewJoke(joke.data))
        dispatch(setError(''))
    } catch (e) {
        dispatch(setError('Error! Try later'))
    }finally {
        dispatch(setIsFetching(false))
    }
}

export const getSavedFavoriteJoke = () => (dispatch: Dispatch<ActionType>) => {
    const savedFavoriteJoke = localStorage.getItem('favorite')
    if (savedFavoriteJoke) {
        dispatch(setSavedFavoriteJokes(JSON.parse(savedFavoriteJoke)))
    }
}
export const fulClearFavoriteJokes = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(clearFavoriteJokes())
    localStorage.clear()
}
export const saveFavoriteJoke = (favoriteJokes: JokeType[]) => {
    localStorage.setItem('favorite', JSON.stringify(favoriteJokes))
}
type ActionType =
    ReturnType<typeof setNewJoke>
    | ReturnType<typeof setSavedFavoriteJokes>
    | ReturnType<typeof clearFavoriteJokes>
    | ReturnType<typeof removeFavoriteJoke>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsFetching>

type InitialStateType = {
    newJoke: JokeType
    favoriteJokes: Array<JokeType>
    error: string
    isFetching: boolean
}
