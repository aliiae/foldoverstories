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

export const textsPropType = PropTypes.arrayOf(PropTypes.shape({
  full_text: PropTypes.string,
  username: PropTypes.string,
}));

export const matchPropType = PropTypes.shape({
  location: PropTypes.object,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  params: PropTypes.object,
});

export const authDefaultPropType = { isAuthenticated: false, token: '', user: {} };

export const historyPropType = PropTypes.shape({
  location: PropTypes.object,
  length: PropTypes.number,
  action: PropTypes.string,
});
