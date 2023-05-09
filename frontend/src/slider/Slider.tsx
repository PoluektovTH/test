import React, { useEffect, memo } from 'react';
import './slider.css';
import '@splidejs/react-splide/css';
import { Photo, Photos } from './Types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useNavigate } from 'react-router-dom';

function Slider({ photos }: { photos: Photos }): JSX.Element {
  const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

  const nav = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      window.dispatchEvent(event);
    }, 5000);

    window.onmousemove = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        window.dispatchEvent(event);
      }, 5000);
    };
    window.onkeydown = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        window.dispatchEvent(event);
      }, 5000);
    };
  }, []);

  return (
    <>
      {' '}
      <div className="header">
        <div className="header__homeBtn" onClick={() => nav('/account')}>
          🏠
        </div>
      </div>
      <Splide
        className="slider"
        options={{
          direction: 'ttb',
          height: '1080px',
          rewind: true,
          speed: 2500,
          keyboard: 'global',
          pagination: false,
        }}
      >
        {photos.map((photo: Photo) => (
          <SplideSlide key={photo.id} id={photo.id} className="slider__photo">
            <img src={photo.url} alt={photo.name} />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}

export default memo(Slider);
