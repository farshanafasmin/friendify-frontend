import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  

  constructor(private route:Router, private ss:ServicesService){}

  ngOnInit(): void {
    
  }

  register(){

    this.route.navigateByUrl('register')
  }

  
 
}
