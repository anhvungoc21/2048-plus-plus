# 2048-plus-plus

A hyped-up and customizable version of the game 2048!

_Website:_ https://2048-plus-plus.netlify.app/

## Introduction

Hi there! Thanks for checking out my take on 2048. I love 2048 (even addicted to it at some point), so I decided, why not add some more features to make players' experience better?

## Features

- **Combo bar**: When multiple tiles are merged in succession within a short amount of time, the value of the tiles spawned will be increased (2 becomes 4 & 4 becomes 8). Also, all existing 2-tiles will become 4-tiles. I hope this creates a bigger incentive for players to speedrun the game!
- **Dark/Light appearance**: Pick one that suits your eyes!
- **Customizable color themes**: Choose a color theme to your liking. I'm not too good at color theory and stuff, so I've only added 2 colors for now. More to come!
- **Customizable board sizes**: The original 4-by-4 grid can be a little bit limiting, punishing, and prevents players from reaching higher scores. I've implemented 2 other board sizes that I think is reasonable. (Again, I can always add more!)

## Features to be implemented

- **Login system** for players to store their best scores and favorite settings. I am in the process of implementing this with a simple database!

## Installation Guide

First, clone the repository:

```
git clone https://github.com/anhvungoc21/2048-plus-plus.git
```

Next, head inside the repositoy and download necessary dependencies:

```
cd 2048-plus-plus
npm install
```

Start the Webpack development server:

```
npm run dev
```

At this point, 2048++ should open on your browser and you can start playing or messing around!

**Note:** Since 2048++ uses DynamoDB to manage user accounts with secret keys acquired from environment variables, you would not have access to the feature right off the bat. I propose some solutions around this:

1. Get rid of any user account-related features. This would be located in the following files:

```
/src/template.html // Remove element with the tag or class with keywords: "account", "user", "login", or "signup"
/src/styles // Remove styles related to the same keywords
/src/js/db // Remove folder entirely
/src/js/userConfig.js // Remove file entirely
/src/js/helpers/handleUser.js // Remove file entirely
/src/js/helpers/handleNavbar.js // Remove any imports and functions related to handleUser.js
```

2. Set up your own DynamoDB database with the same table schema as described in /src/js/db/db.js and create a .env file containing necessary secret keys for your DynamoDB user. I only recommend doing this if you are already familiar with DynamoDB.
3. Configure your own user log-in pipeline

## Acknowledgements

- WebDevSimplified's 2048 tutorial was incredibly helpful for me to understand handling tile-sliding and merging!
- Background music by Loyalty Freak Music at https://www.chosic.com/download-audio/24601/
- Sound effects for tile-merging acquired from https://mixkit.co/free-sound-effects/coin/

---

Feel free to contact me if you have any questions or suggestions about any features of the game. Have fun!

(P/s: I have not optimized the web app for phone/tablet users, please check this out on your computer!)
