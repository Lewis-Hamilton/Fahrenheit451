import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import React from "react";

interface Props {
  setFormSettings: React.Dispatch<
    React.SetStateAction<{
      addThumbnailByURL: boolean;
      requireDescription: boolean;
      addVideoByURL: boolean;
    }>
  >;
  addThumbnailByURL: boolean;
  requireDescription: boolean;
  addVideoByURL: boolean;
}

const FormSettings = (props: Props) => {
  const {setFormSettings, ...state} = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormSettings({...state, [event.target.name]: event.target.checked});
  };

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={state.requireDescription}
              onChange={handleChange}
              name='requireDescription'
            />
          }
          label='Require Description'
        />
      </FormGroup>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={state.addVideoByURL}
              onChange={handleChange}
              name='addVideoByURL'
            />
          }
          label='Use URL for Video'
        />
      </FormGroup> */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={state.addThumbnailByURL}
              onChange={handleChange}
              name='addThumbnailByURL'
            />
          }
          label='Use URL for thumbnail'
        />
      </FormGroup>
    </FormControl>
  );
};

export default FormSettings;
