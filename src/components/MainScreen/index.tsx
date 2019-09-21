import React from 'react';
import Navbar from '../Navbar';
import AuditioneeList from './AuditioneeList';
import ControlSection from './ControlSection';

const MainScreen: React.FC = () => (
  <React.Fragment>
    <Navbar />
    <ControlSection />
    <AuditioneeList />
  </React.Fragment>
);

export default MainScreen;
