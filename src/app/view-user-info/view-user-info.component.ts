import { Component, OnInit,Input,ViewChild , AfterViewInit, ElementRef,} from '@angular/core';
import {ApiServiceService} from '../api-service.service';
import {ViewClass } from  '../view-class';
import {ActivatedRoute} from "@angular/router";
import {ListUserComponent} from  '../list-user';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import{Graph} from '../graph';
import{Chart} from 'chart.js';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from 'angular-google-charts';
declare var google: any;
@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.css'],
 providers:[NgxNavigationWithDataComponent],
})

export class ViewUserInfoComponent implements OnInit {

  //@ViewChild('googlechart', { static: true })
  PieChart=[]
  //public googlechart: GoogleChartComponent;
  graph:Graph[];
list:ViewClass[];
id:number;


title = 'Browser market shares at a specific website, 2014';
type = 'PieChart';
data = [
   ['Firefox', 45.0],
   ['IE', 26.8],
   ['Chrome', 12.8],
   ['Safari', 8.5],
   ['Opera', 6.2],
   ['Others', 0.7] 
];
columnNames = ['Browser', 'Percentage'];
options = {  
  animation:{
    animateScale:true,
    animateRotate:true
  },
  is3D: true
};
width = 750;
height = 500;
constructor(private api:ApiServiceService,private route: NgxNavigationWithDataComponent) { 
  
  }

  ngOnInit() { 
   console.log(this.route.get("id"));
 this.id=this.route.get("id");
     this.api.viewUserDetails(this.id).subscribe((res:ViewClass[])=>console.log(res));
     this.api.gateSaveImg().subscribe((res:Graph[])=>{console.log(res)
       this.graph=res;
       let ydata=[]
       let xdata=[];
       this.graph.forEach((res)=>{
         console.log(res.countId);
         ydata.push(res.countId);
         xdata.push(res.name);
       })
       console.log("ydata are:"+ydata[0]);
       this.PieChart = new Chart('pieChart', {
        type: 'pie',
      data: {
       labels:xdata,
       yValueFormatString: "##0.00\"%\"",
       indexLabel: "{label} {y}",
        datasets: [{
          fill:false,
            label: {position:'Inside',
          visible:true},
            data: ydata,
            backgroundColor: [
                "red","blue","yellow","orange","green"," #17272B","#800000","#800080","aqua"
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      
      }, 
      options: {  
        responsiveAnimationDuration: 10,
     
        responsive:true,
       title:{
           text:"Bar Chart",
           display:true
       },
      
       animation:{
         animateScale:true,
         animateRotate:true
       }, hover: {
        animationDuration:0
    },
      }
      });
      this.PieChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels:xdata,
       yValueFormatString: "##0.00\"%\"",
       indexLabel: "{label} {y}",
        datasets: [{
          fill:false,
            label: {position:'Inside',
          visible:true},
            data: ydata,
            backgroundColor:[
              "red","yellow","green","aqua","blue","pink","#800000","#008080"
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      
      }, 
      options: {  
        responsiveAnimationDuration: 10,
     
        responsive:true,
       title:{
           text:"Bar Chart",
           display:true
       },
      
       animation:{
         animateScale:true,
         animateRotate:true
       }, hover: {
        animationDuration:0
    },
    scales: {
      xAxes: [{
        display:true,
          barThickness:50,
          gridLines: {
              offsetGridLines: true
          }
      }],
      yAxes: [{
        display:true,
        stacked: true
    }]
    
  }
      }
      });
  
    })
  }
  
}
