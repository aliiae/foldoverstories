import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addText} from '../../actions/story';

const HIDDEN_TEXT_PERCENTAGE = 0.8;

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    addText: PropTypes.func.isRequired
  };

  onSubmit(e) {
    e.preventDefault();
    const {text} = this.state;
    const indexVisibleStartsAt = Math.floor(text.length) * HIDDEN_TEXT_PERCENTAGE;
    const post = {
      hidden_text: text.slice(0, indexVisibleStartsAt),
      visible_text: text.slice(indexVisibleStartsAt),
    };
    this.props.addText(post);
    this._reset_text_area();
  };

  _reset_text_area() {
    this.setState({text: ''});
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <textarea onChange={this.onChange}
                    className="form-control" rows="3"
                    placeholder="Enter your text here"
                    value={this.state.text}>
          </textarea>
            <button type="submit" className="btn btn-success btn-sm">
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, {addText})(Button);