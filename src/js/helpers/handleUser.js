import { createAccount, getAccount } from "../db/db.js";

import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
  setUserName,
  setGamesPlayed,
  setBestScore,
} from "../userConfig.js";

// TODO:
// 1. Create alert display, modal shaking -- DONE for successful/failed log-ins/sign-ups -- DONE
// 2. Accessible mute button -- DONE
// 3. Apply settings & scores, update account modal upon successful login -- DONE
// 4. Fix display problem probably because of preventTransition -- DONE-ish
// 5. Update best score and gamesPlayed when appropriate for logged-in users.
// 6. Before user exits, call lambda url to update dynamodb
// 7. Log out functionality

/* Login & Signup */
export const logIn = async (email, password) => {
  // Log in and set necessary configs
  const account = await getAccount(email);
  setLoggedIn(true);
  setEmail(email);
  setPassword(password);
  setUserName(account.userName);
  setGamesPlayed(account.gamesPlayed);
  setBestScore(account.bestScore);
};

// Maybe get from LocalStorage here? Maybe not actually
export const logOut = () => {
  setLoggedIn(false);
  setEmail(null);
  setPassword(null);
  setUserName(null);
  setGamesPlayed(null);
  setBestScore(null);
};

export const tryLogIn = async (email, password) => {
  const account = await getAccount(email);
  if (!account) {
    return [false, null];
  }
  const registeredPassword = account.password;
  if (registeredPassword != password) {
    return false;
  } else {
    await logIn(email, password);
    return [true, account];
  }
};

export const tryCreateAccount = async (userName, email, password) => {
  const account = await getAccount(email);
  if (!account) {
    await createAccount(userName, email, password);
    logIn(email, password);
    return true;
  } else {
    return false;
  }
};
