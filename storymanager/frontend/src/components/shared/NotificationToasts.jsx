import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationToast from './NotificationToast';
import { removeNotification } from '../../store/actions/notifications';

const NotificationToasts = (props) => {
  const { removeNotificationConnect, notifications } = props;
  return (
    <div aria-live="polite" aria-atomic="true" style={{ position: 'relative' }}>
      <div className="notifications-container">
        {notifications
          .filter((notification) => notification.username !== notification.sender)
          .map((notification) => {
            const { id } = notification;
            return (
              <NotificationToast
                {...notification}
                key={id}
                removeNotification={removeNotificationConnect}
                if={id}
              />
            );
          })}
      </div>
    </div>
  );
};

NotificationToasts.propTypes = {
  removeNotificationConnect: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps,
  { removeNotificationConnect: removeNotification })(NotificationToasts);
