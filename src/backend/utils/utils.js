export const errorMessage = (res, error) => {
  return res.status(500).json({ message: error.message, status: false });
};
