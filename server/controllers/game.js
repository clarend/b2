var mongoose = require('mongoose')
var User = mongoose.model('User')
var Game = mongoose.model('Game')

module.exports = {

    //Create User
    create_user: (request, response) => {
        User.findOne({ user_name: request.body.user_name })
            .then(data => {
                if (data) {
                    request.session.user_id = data._id
                    response.json({ data: 'You are logged in.', status: true })
                } else {
                    var user = new User({ user_name: request.body.user_name })
                    user.save()
                        .then(data => {
                            request.session.user_id = data._id
                            response.json({ data: data, status: true })
                        })
                        .catch(error => { response.json({ data: error, status: false }) })
                }
            })
    },

    //Create game
    
    create_game: (request, response) => {
        User.findOne({ _id: request.session.user_id })
            .then(user => {
                if (user) {
                    var game = new Game({
                        question: request.body.question, correctAns: request.body.correctAns,
                        fakeAns1: request.body.fakeAns1, fakeAns2: request.body.fakeAns2, _user: user._id
                    })
                    game.save()
                        .then(data => {
                            user._games.push(data)
                            user.save()
                                .then(saved => {
                                    console.log(saved, data);
                                    response.json({ data: data, status: true })
                                })
                                .catch(error => { response.json({ data: error, status: false }) })
                        })
                        .catch(error => { response.json({ data: error, status: false }) })
                } else {
                    response.redirect('/')
                }
            })
            .catch(error => { response.json({ data: error, status: false }) })

    },

    // Current User info
    current_user: (request, response) => {
        if (request.session.user_id) {
            User.findOne({ _id: request.session.user_id })
                .then(data => {
                    response.json({ data: data, status: true })
                })

        } else {
            response.redirect('/')
        }
    },

    //All Users Information

    all_users: (request, response) => {
        User.find()
            .then(data => {
                response.json(data)
            })
    },

    //All Game Information    
    
    all_games: (request, response) => {
        Game.find()
            .then(data => {
                if (data) {
                    response.json({ data: data, status: true })
                } else {
                    response.json({ data: 'Game Not Available:  Please create a game.', status: false })
                }
            })
    },

    // User Score

    user_score: (request, response) => {
        var result = 0
        User.findOne({ _id: request.session.user_id })
            .then(user => {
                if (user) {

                    Game.findOne({ _id: request.params.game1_id })
                        .then(game1 => {
                            if (game1.correctAns == request.body.option1) {
                                result += 1
                            }
                            Game.findOne({ _id: request.params.game2_id })
                                .then(game2 => {
                                    if (game2.correctAns == request.body.option2) {
                                        result += 1
                                    }
                                    Game.findOne({ _id: request.params.game3_id })
                                        .then(game3 => {
                                            if (game3.correctAns == request.body.option3) {
                                                result += 1
                                            }
                                            user.scores.push(result)
                                            user.save()
                                                .then(data => {
                                                    response.json({ data: data, status: true })
                                                })
                                                .catch(error => { response.json({ data: error, status: false }) })
                                        })
                                })
                        })

                } else {
                    response.redirect('/')
                }
            })
    },   

    //LogOut

    log_out: (request, response) => {
        request.session.destroy()
        response.redirect('/')
    }
}