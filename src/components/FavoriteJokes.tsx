import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../BLL/store';
import {JokeType} from '../API/joke-api';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from './Control';
import FavoriteJoke from './FavoriteJoke';
import {removeFavoriteJoke, saveFavoriteJoke} from '../BLL/joke-reducer';

const WrapperJokes = styled('div')`
  position: relative;
  font-size: 20px;
  min-height: 600px;
  background: #C4C4C4;
  font-weight: bolder;
  letter-spacing: 1px;
  line-height: 30px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  border-radius: 2px;
  padding: 50px 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`
const Navigate = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
`

const FavoriteJokes = () => {
    const dispatch = useDispatch()
    const favoriteJokes = useSelector<RootStateType, JokeType[]>(state => state.joke.favoriteJokes)
    const navigate = useNavigate()

    const deleteJokeOnClick = (joke:JokeType)=>{
        const filteredJokes = favoriteJokes.filter( j => j.id !== joke.id);
        dispatch(removeFavoriteJoke(filteredJokes))
        saveFavoriteJoke(filteredJokes)
    }

    return (
        <WrapperJokes>
            <Navigate><Button onClick={() => navigate(-1)}>back</Button></Navigate>
            {favoriteJokes.map(joke => {
                return <FavoriteJoke key={joke.id} joke={joke} deleteJoke={deleteJokeOnClick}/>
            })}
        </WrapperJokes>
    );
};

export default FavoriteJokes;
