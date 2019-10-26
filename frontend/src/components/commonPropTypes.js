import PropTypes from 'prop-types';

export const authPropType = PropTypes.shape(
  {
    isAuthenticated: PropTypes.boolean,
    token: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  },
);

export const textsPropType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  fullText: PropTypes.string,
  username: PropTypes.string,
}));

export const matchPropType = PropTypes.shape({
  location: PropTypes.object,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  isExact: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
});

export const authDefaultPropType = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const historyPropType = PropTypes.shape({
  location: PropTypes.object,
  length: PropTypes.number,
  action: PropTypes.string,
});

export const userStatusPropType = PropTypes.oneOf([
  'STOPPED', 'WAITING', 'CAN_WRITE',
]);

export const usersPropType = PropTypes.arrayOf(PropTypes.shape({
  username: PropTypes.string,
  textsCount: PropTypes.number,
  userStatus: userStatusPropType,
}));

export const errorsPropType = PropTypes.shape({
  msg: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.shape({
    detail: PropTypes.string,
  })]),
  status: PropTypes.number,
});

export const websocketStatusPropType = PropTypes.oneOf([1, 3]);
