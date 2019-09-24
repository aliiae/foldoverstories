import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addText} from '../../actions/story';

const HIDDEN_PERCENTAGE = 0.8;

export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            author_id: "ae" // TODO: cookie here
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        addText: PropTypes.func.isRequired
    };

    onSubmit(e) {
        e.preventDefault();
        const {text, author_id} = this.state;
        const indexVisibleStartsAt = Math.floor(text.length) * HIDDEN_PERCENTAGE;
        const post = {
            hidden_text: text.slice(0, indexVisibleStartsAt),
            visible_text: text.slice(indexVisibleStartsAt),
            author_id: author_id,
            room_title: "small-cat"
        };
        this.props.addText(post);
        this._reset_text_area();
    };

    _reset_text_area() {
        this.setState({text: ""});
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <textarea onChange={this.onChange}
                              className="form-control" rows="3"
                              placeholder="Enter your text here"
                              value={this.state.text}>
                    </textarea>
                    <button type="submit"
                            className="btn btn-success btn-sm">Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(null, {addText})(Button);