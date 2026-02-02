export const createNotification = (title, description, type = "success") => ({
  type,
  title,
  description,
});
