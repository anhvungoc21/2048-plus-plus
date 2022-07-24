export const INC_PER_COMBO = 2;

let COMBO = false;
let COMBO_INTERVAL_ID = null;

export const getCombo = () => COMBO;
export const getComboIntervalID = () => COMBO_INTERVAL_ID;

export const setCombo = (val) => (COMBO = val);
export const setComboIntervalID = (val) => (COMBO_INTERVAL_ID = val);
