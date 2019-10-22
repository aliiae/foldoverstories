import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationToast from './NotificationToast';
import { removeNotification } from '../../../store/actions/notifications';

const Toasts = (props) => {
  const { dispatchRemoveNotification, notifications } = props;
  const style = { position: 'relative' };
  return (
    <div aria-live="polite" aria-atomic="true" style={style}>
      <div className="notifications-container">
        {notifications
          .filter((notification) => notification.username !== notification.sender)
          .map((notification) => {
            const { id } = notification;
            return (
              <NotificationToast
                {...notification}
                key={id}
                removeNotification={dispatchRemoveNotification}
                if={id}
              />
            );
          })}
      </div>
    </div>
  );
};

Toasts.propTypes = {
  dispatchRemoveNotification: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});
const mapDispatchToProps = { dispatchRemoveNotification: removeNotification };

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
