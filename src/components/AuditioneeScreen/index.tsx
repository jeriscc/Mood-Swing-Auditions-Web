import React from 'react';

interface SingleScreenParams {
  id: string;
}

const AuditioneeScreen: React.FC<SingleScreenParams> = ({ id }) => (
  <div>
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
  </div>
);

export default AuditioneeScreen;
