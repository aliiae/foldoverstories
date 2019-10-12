import React from 'react';
import Moment from 'react-moment';

// e.g. 1 hour ago
export const formatTimeStamp = (dateISOString) => (
  <Moment fromNow withTitle titleFormat="LLL">
    {dateISOString}
  </Moment>
);

// e.g. 6th October 2019
export const formatTimeStampDateOnly = (dateISOString) => (
  <Moment format="LL" withTitle titleFormat="LLL">
    {dateISOString}
  </Moment>
);


// e.g. 15:22
export const formatTimeStampTimeOnly = (dateISOString) => (
  <Moment format="LT" withTitle titleFormat="LTS">
    {dateISOString}
  </Moment>
);
