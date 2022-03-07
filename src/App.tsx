import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './BLL/store';
import {Route, Routes} from 'react-router-dom';
import {getSavedFavoriteJoke} from './BLL/joke-reducer';
import {JokeType} from './API/joke-api';
import FavoriteJokes from './components/FavoriteJokes';
import Preloader from './utils/Preloader';
import styled from 'styled-components';
import Control from './components/Control';

const Wrapper = styled('div')`
  background: #E5E5E5;
  padding: 20px;
  min-height: 100vh;
`
const Content = styled('div')`
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
  line-height: 30px;
  text-align: center;
  background: white;
  min-height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin-bottom: 40px;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`
const InitialContent = styled('span')`
  text-transform: uppercase;
`


function App() {
    const error = useSelector<RootStateType, string>(state => state.joke.error)
    const joke = useSelector<RootStateType, JokeType>(state => state.joke.newJoke)
    const isFetching = useSelector<RootStateType, boolean>(state => state.joke.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSavedFavoriteJoke())
    }, [dispatch])


    const content = error ? error : joke.value
    return (
        <Wrapper>
            <Content>
                {isFetching ? <Preloader/> : content || <InitialContent>get your joke</InitialContent>}
            </Content>
            <Routes>
                <Route path={'/'} element={<Control/>}/>
                <Route path={'favorite'} element={<FavoriteJokes/>}/>
            </Routes>
        </Wrapper>
    );
}

export default App;
