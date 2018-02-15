import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: object
  all_users = []
  msg = ''
  _score = ''
  search_word = ''
  private subA: any
  private subB: any

  constructor(private _service: GameService, private _router1: Router, private _router2: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      name: ''
    }

    this._service.current_user()
      .then(data => {
        if (data.status) {
          console.log(data.status)
        } else {

          this._router1.navigate(['/'])

        }
      })
      .catch(error => {
        var result = prompt('Enter your name')
        if (result) {
          this.user = {
            name: result
          }
          this._service.create_user(this.user)
            .then(data => {
              if (data.status) {
                this._router1.navigate(['/home'])
              } else {
                console.log(data.data)
              }
            })
        } else {
          this._router1.navigate(['/log_out'])
        }
        this._router1.navigate(['/log_out'])
      })

    this._service.all_users()
      .then(data => {
        for (let user of data) {
          for (let score of user.scores) {
            this.all_users.push({
              name: user.name, score: score, percent: Number(score) / 3
            })
          }
        }
        this.all_users.sort((a, b) => { return b.percent - a.percent })
      })
      .catch(error => console.log(error, 'Error'))

    this.subA = this._router2.paramMap.subscribe(params => {
      this._score = params.get('score');
      this.msg = params.get('result');
      console.log(this._score, this.msg)
    })
  }
}
