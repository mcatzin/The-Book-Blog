import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MainNav from './Sidenav/sidenav'

const Header = (props) => {

  let [mainNav, setMainNav] = useState(false);

  const onShowNav = () => {
    setMainNav(true);
  }
  const onHideNav = () => {
    setMainNav(false);
  }
  return (
    <header>
      <div className="open_nav">
        <FontAwesome
          name="bars"
          onClick={() => onShowNav(true)}
          style={{
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '25px',
          }}
        />
      </div>
      <MainNav
        showNav={mainNav}
        onHideNav={() => onHideNav(false)}
      />
      <Link to='/' className="logo">
        <FontAwesome name="book" /> The Book Blog
      </Link>
    </header>
  )
}

export default Header;