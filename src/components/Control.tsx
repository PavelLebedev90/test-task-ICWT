import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../BLL/store';
import {JokeType} from '../API/joke-api';
import {
    fulClearFavoriteJokes,
    getRandomJoke,
    saveFavoriteJoke, setError,
    setSavedFavoriteJokes
} from '../BLL/joke-reducer';
import styled from 'styled-components';

type ButtonPropsType = {
    condition?: boolean
}
export const Button = styled('button')<ButtonPropsType>`
  margin: 5px;
  display: inline-block;
  padding: 10px 5px;
  width: 140px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  background-color: ${props => props.condition ? 'rgba(255,86,79,0.98)' : '#4CAF50'};
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px #999;
  color: currentColor;

  &:hover {
    background-color: ${props => props.condition ? 'rgba(226, 44, 37, 0.98)' : '#3e8e41'};
  }

  &:active {
    background-color: ${props => props.condition ? 'rgba(226, 44, 37, 0.98)' : '#3e8e41'};
    box-shadow: 0 2px #666;
    transform: translateY(3px);
  }

  &:disabled {
    background-color: #666;
    transform: translateY(3px);
  }
`
const WrapperControl = styled('div')`
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
  line-height: 30px;
  text-align: center;
  background: white;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`
const MaxLength = styled('div')`
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
  color: rgba(255,86,79,0.98)
`

const Control = () => {
    const [id, setID] = useState(0)
    const dispatch = useDispatch()
    const joke = useSelector<RootStateType, JokeType>(state => state.joke.newJoke)
    const error = useSelector<RootStateType, string>(state => state.joke.error)
    const favoriteJokes = useSelector<RootStateType, JokeType[]>(state => state.joke.favoriteJokes)
    const isFetching = useSelector<RootStateType, boolean>(state => state.joke.isFetching)

    const getRandomJokeOnClick = () => {
        dispatch(getRandomJoke())
    }
    const getCascadeRandomJokeOnClick = () => {
        if (!id) {
            let id = setInterval(() => {
                dispatch(getRandomJoke())
            }, 3000);
            setID(+id)
        } else {
            clearInterval(id)
            setID(0)
        }

    }

    const addFavoriteJokeOnClick = () => {
        if (Object.keys(joke).length === 0) {
            dispatch(setError('First push get a joke'))
            return
        }
        const filteredJokes = favoriteJokes.filter(j => j.id !== joke.id);
        if (filteredJokes.length === favoriteJokes.length) {
            const newFavoriteJokes = [...favoriteJokes, joke]
            if(favoriteJokes.length < 10){
                dispatch(setSavedFavoriteJokes(newFavoriteJokes))
                saveFavoriteJoke([...favoriteJokes, joke])
            }else{
                newFavoriteJokes.shift()
                dispatch(setSavedFavoriteJokes(newFavoriteJokes));
                saveFavoriteJoke(newFavoriteJokes)
            }
        } else {
            dispatch(setSavedFavoriteJokes(filteredJokes));
            saveFavoriteJoke(filteredJokes)
        }
    }

    const clearFavoriteJokesOnClick = () => {
        dispatch(fulClearFavoriteJokes())
    }
    const currentJoke = favoriteJokes.some(jokeItem => jokeItem.id === joke.id)
    const condition = currentJoke ? 'delete joke' : 'add in favorite joke'
    return (
        <WrapperControl>
            {favoriteJokes.length === 10 && <MaxLength>List of favorite jokes is full</MaxLength>}
            <div>
                <Button onClick={getRandomJokeOnClick}
                       disabled={isFetching || !!id}>
                get a joke
            </Button>
                <Button onClick={getCascadeRandomJokeOnClick}>
                    {id ? 'stop cascade jokes' : 'get cascade jokes'}
                </Button>
                <Button onClick={addFavoriteJokeOnClick}
                        condition={currentJoke}
                        disabled={!!error}>
                    {condition}
                </Button>
                <Button onClick={clearFavoriteJokesOnClick}
                        disabled={!favoriteJokes.length}>
                    clear favorite joke
                </Button>
                <Button><NavLink to={'favorite'}>to favorite jokes</NavLink></Button>
            </div>
        </WrapperControl>
    );
};

export default Control;
