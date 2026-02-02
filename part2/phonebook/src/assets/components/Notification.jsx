const Notification = ({ message }) => {
  if (message === null) return null;

  const { title, description, type = "success" } = message;

  return (
    <div className={`notification ${type}`}>
      <h2 className="notification-title">{title}</h2>
      <p className="notification-description">{description}</p>
    </div>
  );
};

export default Notification;
