import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private r:Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  route(){
    this.r.navigateByUrl('/folder/detail')
  }

  //to do

  //change input to text-area in upload
  //make header disappear when scrolling
  //add search to mobile(make it visible)
  //change font-style especaill for detail heading

}
