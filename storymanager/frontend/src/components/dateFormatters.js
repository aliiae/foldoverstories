import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

dayjs.extend(RelativeTime);

// e.g. 1 hour ago
export const formatTimeStamp = (dateISOString) => (
  dayjs().fromNow(dayjs(dateISOString))
);

// e.g. 6th October 2019
export const formatTimeStampDateOnly = (dateISOString) => (
  dayjs(dateISOString).format('LL')
);


// e.g. 15:22
export const formatTimeStampTimeOnly = (dateISOString) => (
  dayjs(dateISOString).format('LT')
);
