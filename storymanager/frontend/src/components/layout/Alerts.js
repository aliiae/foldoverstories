import React from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.shape(
    {
      status: PropTypes.number,
      msg: PropTypes.oneOfType(
        [
          PropTypes.objectOf(PropTypes.object),
          PropTypes.string,
        ],
      ),
    },
  ),
  alert: PropTypes.shape({
    alerts: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
  }),
  message: PropTypes.shape({
    addText: PropTypes.string,
    passwordsNotMatch: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  error: { status: null, msg: {} },
  alert: { alerts: [] },
};

export class Alerts extends React.Component {
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.visible_text) {
        alert.error('Please select what text will be visible to the next author');
      }
      if (error.msg.author_id) {
        alert.error(`Author id: ${error.msg.author_id.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
      if (error.msg.username) {
        alert.error(`Username: ${error.msg.username.join()}`);
      }
      if (error.msg.password) {
        alert.error(`Password: ${error.msg.password.join()}`);
      }
      if (error.msg.passwordsNotMatch) {
        alert.error(error.msg.passwordsNotMatch.join());
      }
      if (error.msg.author) {
        alert.error(error.msg.author.join());
      }
    }
    if (message !== prevProps.message) {
      if (message.addText) {
        alert.success(message.addText);
      }
      if (message.passwordsNotMatch) {
        alert.error(message.passwordsNotMatch);
      }
    }
  }

  render() {
    return (
      <></>
    );
  }
}

Alerts.propTypes = propTypes;
Alerts.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});
export default connect(mapStateToProps)(withAlert()(Alerts));
