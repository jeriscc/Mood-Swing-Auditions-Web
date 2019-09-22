import React from 'react';
import Navbar from '../Navbar';
import AuditioneeList from './AuditioneeList';
import ControlSection from './ControlSection';
import Footer from './Footer';
import { History } from 'history';

interface MainScreenProps {
  history: History;
  search: String | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ history, search }) => (
  <React.Fragment>
    <Navbar />
    <ControlSection history={history} />
    <AuditioneeList history={history} search={search} />
    <Footer />
  </React.Fragment>
);

export default MainScreen;
