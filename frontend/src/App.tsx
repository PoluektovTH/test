import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';
import Slider from './slider/Slider';
import Layout from './Layout';
import Account from './Account';
import { initialState, reducer } from './reducer/reducer';
import { Photo, Photos } from './slider/Types';
import { Dimensions, getImageSize } from 'react-image-size';

async function fetchImageSize(url: string): Promise<Dimensions> {
  const dimensions = await getImageSize(url);
  return dimensions;
}

function App(): JSX.Element {
  const [error, setError] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/pics/get')
      .then((res) => res.json())
      .then((data: Photos) => {
        dispatch({ type: 'pics/get', payload: data });
      })
      .catch((error) => setError(error));
  }, [dispatch]);

  const handleUpload = async (name: string, url: string): Promise<void> => {
    const { height, width } = await fetchImageSize(url);
    if (height === 1080 && width === 1920) {
      fetch('/pics/upload', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          url: url,
        }),
      })
        .then((res) => res.json())
        .then((data: Photo) => {
          dispatch({ type: 'pics/upload', payload: data });
        })
        .catch((error) => setError(error));
    }
  };
  const handleDelete = (): void => {
    fetch('pics/delAll')
      .then((res) => {
        res.json();
      })
      .then(() => {
        dispatch({ type: 'pics/delAll' });
      })
      .catch((error) => setError(error));
  };
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Slider photos={state.photos} />} />
        <Route
          path="/account"
          element={
            <Account
              photos={state.photos}
              handleUpload={handleUpload}
              handleDelete={handleDelete}
              error={error}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
