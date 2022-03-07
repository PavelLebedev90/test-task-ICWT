import React from 'react';
import {JokeType} from '../API/joke-api';
import {Button} from './Control';
import styled from 'styled-components';

const WrapperJoke = styled('div')`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  max-width: 300px;
  background: white;
  font-weight: bolder;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  padding: 5px;
  margin: 0 8px 14px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`

const FavoriteJoke = ({joke, deleteJoke}:FavoriteJokeType) => {


    return (
        <WrapperJoke>
            <div>
                {joke.value}
            </div>
            <div>
                <Button onClick={() => deleteJoke(joke)}>delete</Button>
            </div>
        </WrapperJoke>
    );
};

export default FavoriteJoke;

type FavoriteJokeType = {
    joke:JokeType
    deleteJoke: (joke:JokeType) =>void
}
