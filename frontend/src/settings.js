export const WEBSITE_TITLE = 'Fold-over Stories';
export const ROOMS_PER_PAGE = 10;
export const TITLE_DELIMITER = '·';
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
export const SOCKET_URL = `${wsProtocol}://${window.location.host}`;
export const NOTIFICATION_DURATION = 5000;
export const MAX_WS_RECONNECTING_ATTEMPTS = 4;
