const CustomLocalStorageManager = {
  //Read localStorage
  getItem(key) {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  },

  //Save in localStorage
  setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  //Remove item in localStorage
  removeItem(key) {
    localStorage.removeItem(key);
  },

  //Clear all
  clear() {
    localStorage.clear();
  }
};

export default CustomLocalStorageManager;
