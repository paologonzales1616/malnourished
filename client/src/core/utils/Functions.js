const Functions = {
  logout: function() {
    localStorage.removeItem("page");
    localStorage.removeItem("access_token");
    localStorage.removeItem("brgy");
  }
};

export default Functions;
