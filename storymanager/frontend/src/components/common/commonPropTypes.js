import PropTypes from 'prop-types';

export const authPropType = PropTypes.shape(
  {
    isAuthenticated: PropTypes.boolean,
    token: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
  },
);

export const authDefaultProp = { isAuthenticated: false, token: '', user: {} };
