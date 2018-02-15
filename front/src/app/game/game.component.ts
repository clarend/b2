import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

 user = ''
 all_games = []
 randomGames = []
 answers: {
   option1: '',
   option2: '',
   option3: ''
 }

  constructor(private _service: GameService, private _router1: Router) { }

  ngOnInit() {
    this._service.current_user()
      .then(data => {
        if(data.status) {
          this.user = data.data.name
        } else {
          this._router1.navigate(['/'])
        }
      })
      .catch(error => { this._router1.navigate(['/']) })

    this._service.all_games()
      .then(data => {
        if(data.status) {
          this.all_games = data.data
          for(var i=0; i<this.all_games.length; i++) {
            let temp = this.all_games[i]
            let rand_ind = Math.trunc(Math.random() * this.all_games.length)
            this.all_games[i] = this.all_games[rand_ind]
            this.all_games[rand_ind] = temp
          }
          for(var i=0; i<3; i++) {
            this.randomGames.push(this.all_games[i])
          }
        }
      })
  this.answers = {
    option1: '',
    option2: '',
    option3: ''
    }
  }

  go_home() {
    this._router1.navigate(['/home'])
  }

  post_answers() {
    var game1_id = this.randomGames[0]._id
    var game2_id = this.randomGames[1]._id
    var game3_id = this.randomGames[2]._id
    this._service.user_score(this.answers, game1_id, game2_id, game3_id)
      .then(data => {
        this.answers = {
          option1: '',
          option2: '',
          option3: ''
          }
          var percent = Number(data.data.scores[data.data.scores.length-1]) * 100
        this._router1.navigate([`/home/Your score is ${data.data.scores[data.data.scores.length-1]} out of 3 (${percent}%)`])
      })
      .catch(error => console.log(error))
  }
}
