import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import Logo from '../../Figure/Logo';
import Menu from './Menu';


function Header() {
  const menuRef = useRef();
  const [show, setShow] = useState(false);
  const toggleMenu = () => {
    setShow(!show);
  };
  const onClickOutside = (e) => {
    if (menuRef.current.contains(e.target)) {
      return;
    }
    setShow(false);
  };
  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', onClickOutside);
    } else {
      document.removeEventListener('mousedown', onClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [show]);

  return (
    <header>
      <Navbar aria-label="main navigation" active={show} domRef={menuRef} className="has-shadow">
        <Container>
          <Navbar.Brand>
            <Navbar.Item renderAs="div" className="brand">
              <Logo data-test="logo" />
            </Navbar.Item>
            <Navbar.Burger onClick={toggleMenu} />
          </Navbar.Brand>
          <Menu />
        </Container>
      </Navbar>
    </header>
  );
}

export default React.memo(Header);
