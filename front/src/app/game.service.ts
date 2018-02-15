import { Injectable } from '@angular/core'
import 'rxjs';
import {Game } from './game';
import { Http } from '@angular/http'


@Injectable()
export class GameService {

  constructor(private _http: Http) { }

  //Create User
  create_user(user) {
    return this._http.post('/create_user', user)
    .map(data => data.json())
    .toPromise()
  }

  //Create Game

  create_game(game: Game) {
    return this._http.post('/create_game', game)
    .map(data => data.json())
    .toPromise()
  }

  //View current user

  current_user() {
    return this._http.get('/current_user')
    .map(data => data.json())
    .toPromise()
  }

  //View all users

  all_users() {
    return this._http.get('/all_users')
    .map(data => data.json())
    .toPromise()
  }

  // New Score

  new_score(id){
    return id
  }

  // User Score

  user_score(result, game1_id, game2_id, game3_id) {
    return this._http.post(`/user_score/${game1_id}/${game2_id}/${game3_id}`, result)
    .map(data => data.json())
    .toPromise()
  }

  //View All Games

  all_games() {
    return this._http.get('/all_games')
    .map(data => data.json())
    .toPromise()
  }

  //Logout

  log_out() {
    return this._http.get('/log_out')
    .map(data => data.json())
    .toPromise()
  }

}
