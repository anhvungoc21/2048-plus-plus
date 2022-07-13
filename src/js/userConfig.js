let LOGGED_IN = false;
let EMAIL = null;
let PASSWORD = null;

export const getLoggedIn = () => LOGGED_IN;
export const setLoggedIn = (val) => (LOGGED_IN = val);

export const getEmail = () => EMAIL;
export const setEmail = (val) => (EMAIL = val);

export const getPassword = () => PASSWORD;
export const setPassword = (val) => (PASSWORD = val);
