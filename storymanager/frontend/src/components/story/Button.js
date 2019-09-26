import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addText } from '../../actions/story';

const HIDDEN_TEXT_PERCENTAGE = 0.8;
const propTypes = {
  addTextConnect: PropTypes.func.isRequired,
};

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    const { addTextConnect } = this.props;
    const indexVisibleStartsAt = Math.floor(text.length) * HIDDEN_TEXT_PERCENTAGE;
    const post = {
      hidden_text: text.slice(0, indexVisibleStartsAt),
      visible_text: text.slice(indexVisibleStartsAt),
    };
    addTextConnect(post);
    this._resetTextArea();
  }

  onChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  _resetTextArea() {
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter your text here"
              value={text}
              onChange={this.onChange}
            />
            <button type="submit" className="btn btn-success btn-sm">
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
}

Button.propTypes = propTypes;

export default connect(null, { addTextConnect: addText })(Button);
