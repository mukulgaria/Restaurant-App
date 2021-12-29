import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!:FormGroup;
  restaurentModelObj:RestaurentData= new RestaurentData;
  allrestaurentData:any;
  showAdd!:boolean;
  showBtn!:boolean;



  constructor(private formBuidler:FormBuilder, private apiService:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuidler.group({

      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    });

    this.getAllData();
  }
  
  addRestaurent(){
    
    this.restaurentModelObj.name =this.formValue.value.name;
    this.restaurentModelObj.email =this.formValue.value.email;
    this.restaurentModelObj.mobile =this.formValue.value.mobile;
    this.restaurentModelObj.address =this.formValue.value.address;
    this.restaurentModelObj.services =this.formValue.value.services;

    this.apiService.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("data added successfully");
      //clear the form

      let ref= document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    },
    err=>alert("err while getting")
    )
  }

  clickAddResto(){
    this.formValue.reset();
  this.showAdd=true;
  this.showBtn=false;
  }

  getAllData(){
    this.apiService.getRestaurent().subscribe(res=>{
      this.allrestaurentData=res;
    })
  }

  deleteRec(data:any){
    this.apiService.deleteRestaurent(data.id).subscribe(res=>{
      alert('data deleted successfully'); 
    })
  } 

  onEditRestaurent(data:any){
    this.showAdd=false;
  this.showBtn=true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls["name"].setValue(data.name);
    this.formValue.controls["email"].setValue(data.name);
    this.formValue.controls["mobile"].setValue(data.name);
    this.formValue.controls["address"].setValue(data.name);
    this.formValue.controls["services"].setValue(data.name);
  }

  updateData(){
    this.restaurentModelObj.id
    this.restaurentModelObj.name =this.formValue.value.name;
    this.restaurentModelObj.email =this.formValue.value.email;
    this.restaurentModelObj.mobile =this.formValue.value.mobile;
    this.restaurentModelObj.address =this.formValue.value.address;
    this.restaurentModelObj.services =this.formValue.value.services;

    this.apiService.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Record Update successfully");
      let ref= document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    },
    err=>alert("err while updating data")
    )
  
  }

}
