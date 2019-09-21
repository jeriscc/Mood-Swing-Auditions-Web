import React from 'react';
import Navbar from '../Navbar';
import AuditioneeList from './AuditioneeList';
import ControlSection from './ControlSection';
import Footer from './Footer';
import { History } from 'history';

interface MainScreenProps {
  history: History;
}

const MainScreen: React.FC<MainScreenProps> = ({ history }) => (
  <React.Fragment>
    <Navbar />
    <ControlSection />
    <AuditioneeList history={history} />
    <Footer />
  </React.Fragment>
);

export default MainScreen;
