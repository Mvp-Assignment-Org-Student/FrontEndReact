export const requireAuth = (navigate) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    navigate("/signin");
    return false;
  }
  return true;
};
