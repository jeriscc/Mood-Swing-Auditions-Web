import React from 'react';
import { useCallback, useState } from 'react';
import { History } from 'history';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    position: 'relative',
  },
  fabButtons: {
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    textAlign: 'center',
  },
  fabButton: {
    margin: '0px 4px',
    color: 'white',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    minWidth: 120,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

type Input = {
  email: string;
  name: string;
  number: Number;
  picture: string;
  voice_part: string;
};

const freshInput: Input = {
  email: '',
  name: '',
  number: -1,
  picture: '',
  voice_part: '',
};

interface ControlSectionProps {
  history: History;
}

const ControlSection: React.FC<ControlSectionProps> = ({ history }) => {
  const classes = useStyles();

  const [fields, setFields] = React.useState<Input>(freshInput);

  const [open, setOpen] = useState<{ search: boolean; post: boolean }>({
    search: false,
    post: false,
  });

  const handleOpen = (name: keyof typeof open) => () => {
    setFields(freshInput);
    setOpen({
      ...open,
      [name]: true,
    });
  };

  const handleClose = (name: keyof typeof open) => () => {
    setOpen({
      ...open,
      [name]: false,
    });
  };

  const handleChange = (name: keyof typeof fields) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFields({
      ...fields,
      [name]: event.target.value,
    });
  };

  const search = useCallback(() => {
    const url = `number=${fields.number}&voice_part=${fields.voice_part}`;
    history.push('/main/' + url);
  }, [history, fields]);

  const submitPost = async () => {
    console.log(fields);
    const res = await fetch('/function-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
    console.log(res);
    if (!res.ok) {
      alert('Failed to add Auditionee: ' + (await res.json()).message);
    } else {
      handleClose('post');
    }
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom>
          {new Date().getFullYear()} Auditionees
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Use this app to quickly access auditionees.
        </Typography>
      </Container>
      <div className={classes.fabButtons}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleOpen('search')}>
          <SearchIcon />
        </Fab>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleOpen('post')}>
          <AddIcon />
        </Fab>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open.post}
        onClose={handleClose('post')}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open.post}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title" gutterBottom>
              Add new
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange('name')}
                  id="name"
                  name="name"
                  label="Full Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange('email')}
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={handleChange('number')}
                  id="number"
                  name="number"
                  label="Audition Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="voice-part-simple">
                    Voice Part
                  </InputLabel>
                  <Select
                    required
                    onChange={handleChange('voice_part')}
                    inputProps={{
                      name: 'voice_part',
                      id: 'voice-part-simple',
                    }}
                    value={fields.voice_part}>
                    <MenuItem value="sop">Sopranno</MenuItem>
                    <MenuItem value="mezzo">Mezzo</MenuItem>
                    <MenuItem value="alto">Alto</MenuItem>
                    <MenuItem value="tenor">Tenor</MenuItem>
                    <MenuItem value="bari">Baritone</MenuItem>
                    <MenuItem value="bass">Bass</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}>
                Upload Photo
                <CloudUploadIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submitPost}>
                Post
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open.search}
        onClose={handleClose('search')}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open.search}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title" gutterBottom>
              Search
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={handleChange('number')}
                  id="number"
                  name="number"
                  label="Audition Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="voice-part-simple">
                    Voice Part
                  </InputLabel>
                  <Select
                    required
                    onChange={handleChange('voice_part')}
                    inputProps={{
                      name: 'voice_part',
                      id: 'voice-part-simple',
                    }}
                    value={fields.voice_part}>
                    <MenuItem value="sop">Sopranno</MenuItem>
                    <MenuItem value="mezzo">Mezzo</MenuItem>
                    <MenuItem value="alto">Alto</MenuItem>
                    <MenuItem value="tenor">Tenor</MenuItem>
                    <MenuItem value="bari">Baritone</MenuItem>
                    <MenuItem value="bass">Bass</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={search}>
                Search
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ControlSection;
