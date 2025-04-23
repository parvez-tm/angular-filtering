import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  data:any = []
  constructor(
    private http: HttpClient
  ){

  }

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

  onSearch(e: Event): void {2
    const target = e.target as HTMLInputElement;
    if(e){
      this.data = this.data2.filter((data:any)=> data.name.toLowerCase().includes(target.value))
    }
  }
  
}
