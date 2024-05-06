import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-view-followers',
  templateUrl: './view-followers.component.html',
  styleUrls: ['./view-followers.component.css']
})
export class ViewFollowersComponent implements OnInit {

  constructor(private ss: ServicesService) {}




  ngOnInit(): void {
     
    }
}
