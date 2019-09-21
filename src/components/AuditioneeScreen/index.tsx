import React from 'react';
import { useState, useMemo } from 'react';

import { Auditionee } from '../../types';

import Navbar from '../Navbar';
import Container from '@material-ui/core/Container';

interface SingleScreenParams {
  id: string;
}

const AuditioneeScreen: React.FC<SingleScreenParams> = ({ id }) => {
  const [auditionee, setAuditionee] = useState<Auditionee | null>(null);

  useMemo(async () => {
    const body = await fetch(`/function-get?id=${id}`);
    setAuditionee(await body.json());
  }, [id]);

  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="md">
        {auditionee && (
          <ul>
            <li>
              <img src={auditionee.picture} alt="Profile" />
              <div>{auditionee.name}</div>
            </li>
          </ul>
        )}
      </Container>
    </React.Fragment>
  );
};

export default AuditioneeScreen;
