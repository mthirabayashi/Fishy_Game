## Fishy Game

### Background


Fishy is a simple 1-player game.  The objective of the game is to eat all the smaller fish in the water and eventually grow to become the largest fish.  Eating a smaller fish will help grow your fish and running into a larger fish will end the game.


### Functionality & MVP  

Within the Fishy Game, users will be able to:

- [ ] Start the game
- [ ] Move their fish around the game
- [ ] View their current score

In addition, this project will include:

- [ ] An instruction modal describing the rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with the game, game Title, nav links to my Github and LinkedIn pages and a button that will open a Modal with the game instructions.


![wireframes](https://raw.githubusercontent.com/mthirabayashi/Fishy_Game/master/docs/Fishy_Mockup.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:

`game.js`: this script will handle the updating and rendering of the canvas elements.

`fish.js`: this script will handle the logic of the fish elements of the game.

`hero.js`: this script will handle the logic of the hero fish element of the game.

`util.js`: this script will handle the logic of the moving elements of the game.

### Implementation Timeline

**Day 1**: Basic setup.  This will include all necessary Node modules as well as getting webpack up and running.  Create `webpack.config.js`, `package.json` and the file structure of the 4 scripts mentioned above.  Review the basics of Canvas and get a general page layout setup.

- Get a green bundle with `webpack`
- Review enough Canvas to have the basic layout of the game displayed.


**Day 2**: Build `hero.js` and parts of `util.js` and `game.js`.  User `game.s` to create and render the hero of the game and be able to move around.  Add a background to the game screen.

- Complete `hero.js`
- Render the hero on the `Canvas` screen
- Render the background image on the `Canvas` screen
- Make sure the hero is able to move around all directions


**Day 3**: Build `fish.js` and the remaining parts of `util.js`.  Add images for each of the various fish in the game.

- Complete `fish.js` and `util.js`
- Render the fish on the `Canvas` screen
- Complete the logic for the Fish and the interactions between the fish and the hero



**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells]

**Day 4**: Add remaining functionality and styling to the game page.  Add personal links (github and linkedin).  Add game instruction Modal.

- Add personal links to github and Linked
- Add styling to game page
- Create instruction Modal



### Bonus features

There are some additional features that could be added if extra time:

- [ ] Add options for different game difficulties
- [ ] Add levels to the game to make it more user friendly
- [ ] Add high scores in database
