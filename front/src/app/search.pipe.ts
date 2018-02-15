import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: Array<any>, user_search: string): any {
    if (!user_search) return list
    var new_list = []
    for (let user of list) {
      if (user.name.toLowerCase().includes(user_search.toLowerCase()) || user.score == user_search || `${user.percent * 100}%`.includes(user_search)) {
        new_list.push(user)
      }
    }
    return new_list;
  }

}
