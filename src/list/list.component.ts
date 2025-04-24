import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

enum ORDER {
  Normal,
  ASC,
  DESC
}

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  ORDER = ORDER;

  data:any = []
  constructor(
    private http: HttpClient
  ){

  }
  order = 0

  ngOnInit(){
    this.getData()
  }

  data2:any
  getData(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data:any)=>{
      this.data = data
      this.data2 = data
    })
  }

  onSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    if(e){
      console.log(this.data.map((d:any)=>d.name.toLowerCase()));
      
      this.data = this.data2.filter((data:any)=> data.name.toLowerCase().includes(target.value))
    }
  }


  onSort(){
    this.order++
    if (this.order == 3) this.order = 0

    // console.log(this.order,"ad");
    let b = this.sort(this.data2,this.order)
    // let a = this.order == 0 ?this.data: b
    // let a = this.sort(this.data2,this.order)
    console.log(this.data2,"ad");
    
  }
  
  sort(a:any[],order:number){
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
  }
}
