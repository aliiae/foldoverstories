import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addText } from '../../actions/story';
import JoinButton from './JoinButton';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';

const propTypes = {
  addTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool.isRequired,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  usernames: [],
  auth: authDefaultProp,
};

class TextAreaButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLastText: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { text, isLastText } = this.state;
    const { addTextConnect, roomTitle } = this.props;
    const lastNewLineIndex = text.lastIndexOf('\n');
    const textPost = {
      hidden_text: text.slice(0, lastNewLineIndex),
      visible_text: text.slice(lastNewLineIndex + 1),
      is_last: isLastText,
    };
    addTextConnect(textPost, roomTitle);
    this._resetInputFields();
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onChangeCheckbox(e) {
    this.setState({
      isLastText: e.target.checked,
    });
  }

  _resetInputFields() {
    this.setState({ text: '', isLastText: false });
  }

  render() {
    const { text, isLastText } = this.state;
    const {
      auth, correctTurn, roomTitle, usernames,
    } = this.props;
    const { isLoading, isAuthenticated, user } = auth;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isAuthenticated) {
      const { username } = user;
      if (!usernames.includes(username)) {
        return (<JoinButton roomTitle={roomTitle} />);
      }
    } else {
      return (<JoinButton roomTitle={roomTitle} />);
    }

    const waitingForTurn = <p>Waiting for the next author&hellip;</p>;
    const placeholder = 'Type your text here. Remember that only the last line will be visible!';
    const submitForm = (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="2"
            placeholder={placeholder}
            value={text}
            onChange={this.onChangeText}
            name="text"
            style={{ resize: 'none' }}
          />
          <button type="submit" className="btn btn-success btn-sm mt-3">
            Submit
          </button>
          <div className="form-check" style={{ display: 'inline-block' }}>
            <label className="form-check-label" htmlFor="isLastTextCheckbox">
              <input
                className="form-check-input"
                type="checkbox"
                id="isLastTextCheckbox"
                value="isLastText"
                onChange={this.onChangeCheckbox}
                checked={isLastText}
                name="isLastText"
              />
              This is my last input in this story
            </label>
          </div>
        </div>
      </form>
    );

    return (
      <>
        {correctTurn ? submitForm : waitingForTurn}
      </>
    );
  }
}

TextAreaButton.propTypes = propTypes;
TextAreaButton.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
  correctTurn: state.story.correct_turn,
  usernames: state.story.users.map(user => user.username),
});

export default connect(mapStateToProps, { addTextConnect: addText })(TextAreaButton);
