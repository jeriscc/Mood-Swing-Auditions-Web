import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.instagram.com/moodswing.acappella/">
        Mood Swing A Cappella
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
