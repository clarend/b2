var game = require('../controllers/game.js')
var path = require('path')

module.exports = function (app) {

//Routes for trivia

//Create user and game
  app.post('/create_user', game.create_user)
  app.post('/create_game', game.create_game)

//View users info
  app.get('/current_user', game.current_user)
  app.get('/all_users', game.all_users)
  app.post('/user_score/:game1_id/:game2_id/:game3_id', game.user_score)
  app.get('/all_games', game.all_games) 

//Logout
  app.get('/log_out', game.log_out)

  app.all('*', (request, response) => {
    response.sendFile(path.resolve('./front/index.html'))
  })
}