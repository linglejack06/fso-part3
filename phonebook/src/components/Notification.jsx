const Notification = ({ message, type }) => {
  if(message === null) return null;
  let className = '';
  if(type === 'error') {
    className = 'notification error';
  } else if (type === 'completion') {
    className = 'notification completion'
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}
export default Notification;