import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {

  constructor(private _dataService: DataService) { }
  influencers: Array<any>;

  ngOnInit() {
  	this._dataService.getInfluencers().map(res=>res.json()).subscribe(res=> {
    	console.log(res)
    	var realInfluencers = res['data']
    	realInfluencers.shift()
    	this.influencers = realInfluencers});
  }



}
