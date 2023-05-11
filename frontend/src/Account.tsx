import React, { useState, memo } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import './slider/slider.css';
import { Photos } from './slider/Types';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Dimensions, getImageSize } from 'react-image-size';

type Props = {
  photos: Photos;
  handleUpload: (name: string, url: string) => void;
  handleDelete: () => void;
  error: string;
};

function Account({
  photos,
  handleUpload,
  handleDelete,
  error,
}: Props): JSX.Element {
  const [form, setForm] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [dimensions, setDimensions] = useState<Dimensions>();

  async function fetchImageSize(): Promise<void> {
    if (url) {
      const dimensions = await getImageSize(url);
      setDimensions(dimensions);
    }
  }

  const nav = useNavigate();

  return (
    <div className="account">
      <div className="account_header">
        <p className="account_header__text">Welcome to your personal account</p>
      </div>
      <ImageList
        sx={{ width: 1000, height: 328 }}
        cols={3}
        rowHeight={328}
        className="gallery"
      >
        {photos.map((photo) => (
          <ImageListItem key={photo.id}>
            <img
              src={`${photo.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${photo.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={photo.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <p className="gallery_text">Current set of pics</p>
      <Button
        variant="contained"
        color="warning"
        type="button"
        onClick={handleDelete}
      >
        Delete all downloaded pics
      </Button>
      <br />
      {form ? (
        <div className="form__inputs">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            onKeyUp={() => fetchImageSize()}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="form__buttons">
        <Button
          variant="contained"
          color={form ? 'warning' : 'success'}
          type="button"
          onClick={() => setForm(!form)}
          className="form__openBtn"
        >
          {!form ? 'Download new pic' : 'Cancel'}
        </Button>
        {form ? (
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={dimensions?.width !== 1920 && dimensions?.height !== 1080}
            onClick={() => {
              handleUpload(name, url);
              setForm(false);
            }}
          >
            Upload
          </Button>
        ) : (
          <></>
        )}
      </div>
      {error ? <p>Something went wrong, try later</p> : <></>}
      <br />
      <Button variant="contained" type="button" onClick={() => nav(-1)}>
        Back to main page
      </Button>
    </div>
  );
}

export default memo(Account);
