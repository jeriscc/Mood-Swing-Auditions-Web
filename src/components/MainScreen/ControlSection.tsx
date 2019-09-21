import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    position: 'relative',
  },
  fabButton: {
    color: 'white',
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function ControlSection() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom>
          2019 Auditionees
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>
      </Container>
      <Fab color="secondary" aria-label="add" className={classes.fabButton}>
        <AddIcon />
      </Fab>
    </div>
  );
}
