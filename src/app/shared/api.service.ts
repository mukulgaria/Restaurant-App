import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
    //right the services. POST,GET
    //Using Post Method
    postRestaurent(data:any){
      return this._http.post("http://localhost:3000/posts",data).pipe(map((res:any)=>{return res}));
    }
    //for get method
    getRestaurent(){
      return this._http.get("http://localhost:3000/posts").pipe(map((res:any)=>{return res}));
    }

    updateRestaurent(data:any,id:number){
      return this._http.put("http://localhost:3000/posts/"+id,data).pipe((res:any)=>{return res});
    }

    deleteRestaurent(id:number){
      return this._http.delete("http://localhost:3000/posts/"+id).pipe((res:any)=>{return res});
    }


  
}
