import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

enum SortOrder {
  None = 0,
  Asc = 1,
  Desc = 2,
}

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  ORDER = SortOrder;
  ORDER_LABELS = ['↕', '↑', '↓'];

  // order = 0
  order: SortOrder = SortOrder.None;
  data2:any[] = []
  data:any[] = []
  constructor(
    private http: HttpClient
  ){

  }

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data:any)=>{
      // this.data = data
      // this.data2 = data
      this.data = data;
      this.data2 = [...data]; // or use JSON.parse(JSON.stringify(data)) for deep clone if needed

    })
  }

  onSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    if(e){
      this.data = this.data2.filter((data:any)=> data.name.toLowerCase().includes(target.value))
    }
  }

  onSort(): void {
    this.order = (this.order + 1) % 3;
    this.data = this.order == 0 ? this.data2 :this.sort(this.order)
  }

  sort(order:number){
    let a = [...this.data]
    for (var i = 0; i < a.length; i++) {
      for (var j = i; j < a.length; j++) {
          if(order == 1 && a[i].username > a[j].username){
            let b = a[i]
            a[i] = a[j]
            a[j] = b
          }
          if(order == 2 && a[i].username < a[j].username){
            let b = a[i]
            a[i] = a[j]
            a[j] = b
          }
      }
    }
    return a
  }

  sortData(): void {
    const sorted = [...this.data]; // work on a clone
    if (this.order === SortOrder.Asc) {
      sorted.sort((a, b) => a.username.localeCompare(b.username));
    } else if (this.order === SortOrder.Desc) {
      sorted.sort((a, b) => b.username.localeCompare(a.username));
    }
    this.data = sorted;
  }


}
