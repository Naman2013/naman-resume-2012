import React from 'react';
import { Link } from 'react-router';
import { white, pink } from '../../styles/variables/colors';


const btnPrimary = {
  background: pink,
  color: white,
  height: '40px',
  lineHeight: '40px',
  fontSize: '13px',
  textAlign: 'center',
  WebkitTransition: 'all 0.1s ease-in',
  MozTransition: 'all 0.1s ease-in',
  OTransition: 'all 0.1s ease-in',
  transition: 'all 0.1s ease-in',
  display: 'inline-block',
  margin: '0 250px',
  border: 'none',
  borderRadius: 0,
  textDecoration: 'none',
  padding: '0 15px',
};

function Header() {
  return (
    <div className="header-container">
      <header className="main">
      </header>
      <Link to="http://amazon.com" style={btnPrimary}>GET YOUR COPY ON AMAZON</Link>
      <style jsx>{`
        .header-container {
          height: 350px;
          width: 100%;
        }
        .main {
          height: 300px;
          width: 100%;
          background-color: black;
        }
      `}</style>
    </div>
  );
}

export default Header;
