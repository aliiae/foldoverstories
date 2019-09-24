import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getVisibleText} from '../../actions/story';

export class Paper extends React.Component {
    static propTypes = {
        visible_text: PropTypes.string.isRequired,
        getVisibleText: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getVisibleText();
    }

    render() {
        return (
            <Fragment>
                {this.props.visible_text ? (
                        <p>...{this.props.visible_text}</p>) :
                    (<p className="lead">Start your story!</p>)}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    visible_text: state.story.visible_text
});

export default connect(mapStateToProps, {getVisibleText})(Paper);