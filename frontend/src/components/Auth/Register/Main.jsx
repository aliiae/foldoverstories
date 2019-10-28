import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import Heading from 'react-bulma-components/lib/components/heading';
import RegisterForm from './RegisterForm';
import AnimateLoad from '../../wrappers/animateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import CardContainer from '../CardContainer';


function Register(props) {
  useEffect(() => {
    document.title = `Register ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);

  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <CardContainer>
      <Card.Content>
        <Heading>Register</Heading>
        <div>
          <RegisterForm />
        </div>
      </Card.Content>
    </CardContainer>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,

};
Register.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AnimateLoad(Register));
