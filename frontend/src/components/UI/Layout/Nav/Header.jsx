import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import Logo from '../../Figure/Logo';
import Menu from './Menu';

function Header() {
  const navRef = useRef(null);
  const [show, setShow] = useState(false);
  const toggleMenu = () => {
    setShow(!show);
  };
  const onClickOutside = (e) => {
    if (e && navRef.current.contains(e.target) && e.target.nodeName === 'DIV') {
      return;
    }
    setShow(false);
  };
  useEffect(() => {
    if (show) {
      document.addEventListener('click', onClickOutside);
    } else {
      document.removeEventListener('click', onClickOutside);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [show]);

  return (
    <header>
      <Navbar aria-label="main navigation" active={show} domRef={navRef} className="has-shadow">
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
