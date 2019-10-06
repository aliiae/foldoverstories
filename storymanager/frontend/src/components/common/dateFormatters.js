import React from 'react';
import Moment from 'react-moment';

export const formatTimeStamp = (dateISOString) => {
  // e.g. 1 hour ago
  return (
    <Moment fromNow withTitle titleFormat="LLL">
      {dateISOString}
    </Moment>
  );
};

export const formatTimeStampDateOnly = (dateISOString) => {
  // e.g. 6th October 2019
  return (
    <Moment format="LL" withTitle titleFormat="LLL">
      {dateISOString}
    </Moment>
  );
};
