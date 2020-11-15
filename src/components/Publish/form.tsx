import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface Props {
  addThumbnailByURL: boolean;
  requireDescription: boolean;
  addVideoByURL: boolean;
}

const PublishForm = (props: Props) => {
  const { addThumbnailByURL, requireDescription, addVideoByURL } = props;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formComplete, setFormComplete] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  useEffect(() => {
    if (
      (title !== "" && addThumbnailByURL
        ? true
        : description !== "" && thumbnail) ||
      (uploadedImage !== "" && url !== "")
    ) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [title, description, thumbnail, url, uploadedImage]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      title,
      description,
      thumbnail: thumbnail || uploadedImage,
      url,
    };
    setLoading(true);
    Axios.post(
      "https://susanwabbajacksucks.herokuapp.com/api/video/upload/manual",
      payload
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTitle = (event: any) => {
    setTitle(event.currentTarget.value);
  };

  const handleDescription = (event: any) => {
    setDescription(event.currentTarget.value);
  };

  const handleThumbnail = (event: any) => {
    setThumbnail(event.currentTarget.value);
  };

  const handleUrl = (event: any) => {
    setUrl(event.currentTarget.value);
  };
  const classes = useStyles();

  const handleReadURL = (input: React.ChangeEvent<HTMLInputElement>) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      const file = input.target.files[0];
      reader.onload = function (e) {
        const dataUrl = reader.result;
        setUploadedImage(dataUrl as string);
        console.log(dataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage("");
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={onSubmit} className={classes.root} autoComplete='off'>
          <Grid container spacing={3} item xs={12}>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                onChange={handleTitle}
                fullWidth
                id='outlined-basic'
                label='Title'
                variant='outlined'
                value={title}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required={requireDescription}
                onChange={handleDescription}
                fullWidth
                id='outlined-basic'
                label='Description'
                variant='outlined'
                value={description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item xs={12}>
            {addThumbnailByURL ? (
              <Grid item sm={6} xs={12}>
                <TextField
                  onChange={handleThumbnail}
                  required
                  id='outlined-basic'
                  label='Thumbnail Url'
                  variant='outlined'
                  value={thumbnail}
                />
              </Grid>
            ) : null}

            <Grid item sm={addThumbnailByURL ? 6 : 12} xs={12}>
              <TextField
                fullWidth
                required
                onChange={handleUrl}
                id='outlined-basic'
                label='Video Url'
                variant='outlined'
                value={url}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item xs={12}>
            <Grid item xs={12}>
              {uploadedImage ? (
                <div className='file-upload-content'>
                  <img
                    className='file-upload-image'
                    src={uploadedImage}
                    alt='your image'
                  />
                  <div className='image-title-wrap'>
                    <Button onClick={handleRemoveImage} variant='outlined'>
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : addThumbnailByURL ? null : (
                <div className='image-upload-wrap'>
                  <input
                    required
                    className='file-upload-input'
                    type='file'
                    onChange={handleReadURL}
                    accept='image/*'
                  />
                  <div className='drag-text'>
                    <h3>Drag and drop a thumbnail to be added</h3>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} item xs={12}>
            <Grid item xs={12}>
              <Button
                disabled={!formComplete}
                variant='outlined'
                fullWidth
                type='submit'
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default PublishForm;
