let id = 0;

export default function createNotification(options) {
  return { ...options, id: id++ };
}
