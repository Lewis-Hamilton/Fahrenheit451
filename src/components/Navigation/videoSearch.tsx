import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import useWindowSize from "../../useWindowSize";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    smallScreen: {
      padding: "2px 4px",
      display: "flex",
      marginLeft: "auto",
      marginRight: 0,
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface Props {
  search: (event: any, value: string) => void;
}

export default function VideoSearch(props: Props) {
  const classes = useStyles();
  const {search} = props;
  const [term, setTerm] = useState<string>("");
  const windowSize = useWindowSize();
  const [displaySearch, setDisplaySearch] = useState(true);

  useEffect(() => {
    setDisplaySearch(windowSize === "sm" || windowSize === "md");
  }, [windowSize]);

  const handleSearch = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setTerm(event.currentTarget.value);
  };

  const onSubmit = (event: any) => {
    if (term) {
      event.preventDefault();

      search(event, term);
    }
  };

  if (windowSize === "sm" || windowSize === "md") {
    return (
      <>
        {!displaySearch ? (
          <Paper
            onSubmit={onSubmit}
            elevation={0}
            component='form'
            className={classes.smallScreen}
          >
            <InputBase
              onChange={handleSearch}
              className={classes.input}
              placeholder='Search'
              inputProps={{"aria-label": "search"}}
            />
            <IconButton
              disabled={!term}
              onClick={onSubmit}
              type='submit'
              className={classes.iconButton}
              aria-label='search'
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        ) : (
            <IconButton
              style={{marginLeft: "auto", marginRight: 0}}
              onClick={() => {
                setDisplaySearch(false);
              }}
            >
              <SearchIcon />
            </IconButton>
        )}
      </>
    );
  }
  return (
    <>
      <Paper
        onSubmit={onSubmit}
        elevation={0}
        component='form'
        className={classes.root}
      >
        <InputBase
          onChange={handleSearch}
          className={classes.input}
          placeholder='Search'
          inputProps={{"aria-label": "search"}}
        />
        <IconButton
          disabled={!term}
          onClick={onSubmit}
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
