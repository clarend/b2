import { Component, OnInit } from '@angular/core';
import { Game } from './../game'
import { Router, ActivatedRoute } from '@angular/router'
import { GameService } from './../game.service'



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  new_question: Game;

  constructor( private _router1: Router, private _service: GameService) { }

  ngOnInit() {
    this.new_question = new Game
    this._service.current_user()
      .then(data => {
        if(data.status) {
        } else {
          this._router1.navigate(['/'])
        }
      })
      .catch(error => { this._router1.navigate(['/']) })
  }

  go_home() {
    this._router1.navigate(['/home'])
  }

  post_data() {
    this._service.create_game(this.new_question)
      .then(data => {
        this.new_question = new Game
          var note = 'Added Question!'
          console.log('Add question')
          this._router1.navigate([`/home/${note}`])

      })
      .catch(error => {console.log(error)})
  }


}
