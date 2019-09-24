import React, {Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends React.Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;
        if (error !== prevProps.error) {
            if (error.msg.visible_text) {
                alert.error(`Please select what text will be visible: ${error.msg.visible_text.join()}`);
            }
            if (error.msg.author_id) {
                alert.error(`Author id: ${error.msg.author_id.join()}`);
            }
        }

        if (message !== prevProps.message) {
            if (message.addText) {
                alert.success(message.addText);
            }
        }
    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});
export default connect(mapStateToProps)(withAlert()(Alerts));