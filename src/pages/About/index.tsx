import React from 'react';
import { Outlet } from 'react-router-dom';

const AboutPage: React.FC = () => (
  <div>
    About Page
    <hr></hr>
    <Outlet></Outlet>
  </div>
);

export default AboutPage;
