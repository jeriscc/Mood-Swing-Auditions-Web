import React from 'react';
import { useCallback, useState, useMemo } from 'react';
import { History } from 'history';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '40vh',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface AuditioneeListProps {
  history: History;
  search: String | null;
}

const AuditioneeList: React.FC<AuditioneeListProps> = ({ history, search }) => {
  const [auditionees, setAuditionees] = useState<any[]>([]);

  useMemo(async () => {
    const url =
      '/function-get-all' +
      (search !== null && search !== '' ? '?' + search : null);
    const body = await fetch(url);
    setAuditionees(await body.json());
  }, [search]);

  const navToDetails = useCallback(
    auditionee => {
      history.push(`auditionee/${auditionee.id}`);
    },
    [history]
  );

  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {auditionees === null || auditionees.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          gutterBottom>
          Add Your First Auditionee Above!
        </Typography>
      ) : null}
      <Grid container spacing={4}>
        {auditionees.map(doc => (
          <Grid item key={doc.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={doc.picture}
                title="Audition Picture"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {doc.number + ' ' + doc.name}
                </Typography>
                <Typography>Voice part: {doc.voice_part}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={navToDetails.bind(null, doc)}>
                  View
                </Button>
                <Button size="small" color="secondary" disabled>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AuditioneeList;
