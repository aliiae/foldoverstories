let id = 0;

const defaultOptions = { text: '' };

export default function createNotification(options) {
  return {
    ...defaultOptions,
    ...options,
    id: id++,
  };
}
