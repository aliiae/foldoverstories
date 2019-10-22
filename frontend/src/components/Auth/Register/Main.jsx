import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ErrorModal from './ErrorModal';
import RegisterForm from './RegisterForm';


function Register(props) {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="pt-3 pb-3">
      <Col md={6} className="m-auto">
        <Card>
          <Card.Body>
            <Card.Title>
              <h1 className="text-center">Register</h1>
            </Card.Title>
            <RegisterForm />
          </Card.Body>
        </Card>
      </Col>
      <ErrorModal />
    </Container>
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

export default connect(mapStateToProps)(Register);
