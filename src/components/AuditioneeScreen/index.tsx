import React from 'react';
import Navbar from '../Navbar';

interface SingleScreenParams {
  id: string;
}

const AuditioneeScreen: React.FC<SingleScreenParams> = ({ id }) => (
  <React.Fragment>
    <Navbar />
    <ul>
      <li>
        <img
          src="https://randomuser.me/api/portraits/thumb/men/1.jpg"
          alt="Profile"
        />
        <div>{id}</div>
        <div>Jerry Liang</div>
      </li>
    </ul>
  </React.Fragment>
);

export default AuditioneeScreen;
