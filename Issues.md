**Todos:**
1. Implement user log-in/out directly inside page with MongoDB. If logged in, get settings/highest score from Mongo. Else, load from localstorage.
   Indices should store:
   - Email
   - Password
   - Highest Score
   - Game Played (for each board size and total)
   - Last Settings (color, boardSize, darkMode)
2. Implement energy bar, When it’s full, all blocks that spawn are doubled. Basically have a config for the chance of blocks spawn chance/value.
   Progress bar CSS.

**Known Unresolved Issues:**

Input speed is slowed down due to async/await-ing tile transitions. Tried resolving this to no avail. 2. Need to accomodate for each device size. 3.
