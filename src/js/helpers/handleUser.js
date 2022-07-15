// import { createAccount, getAccount } from "../db/db.js";
import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
} from "../userConfig.js";

export const tryLogIn = (email, password) => {
  const account = getAccount(email);
  const registeredPassword = account.password;
  if (registeredPassword != password) {
    return false;
  } else {
    logIn(email, password);
    return true;
  }
};

export const logIn = (email, password) => {
  setLoggedIn(true);
  setEmail(email);
  setPassword(password);
};

export const logOut = () => {
  setLoggedIn(false);
  setEmail(null);
  setPassword(null);
};
