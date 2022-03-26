import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { combineLatest, merge, Subject, throwError } from 'rxjs';
import { catchError, map, scan, startWith, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MediaService } from '../media/media.service';
import { Imedia } from './media';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  errormsg = ''
  currentUser = ''
  col = 'All'
  plainSearch = ''
  updateMedia = false
  search = false

  private insertedmedia = new Subject<Imedia | number>()
  insertedMediaAction$ = this.insertedmedia.asObservable()

  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();

  allMedia$ = this._ms.getAllMedia()

  mediawithAdds$ = merge(
    this.allMedia$,
    this.insertedMediaAction$
  ).pipe(
    scan((meds: Imedia[], med: Imedia | number) => this.modifyProducts(meds, med))
   
  )


 

  allMediaWithSearch$ = combineLatest([
    this.mediawithAdds$,
    this.insertedSearchedptn$.pipe(
      startWith('')
    )
  ]).pipe(
    map(([media, md]) => {
      if(this.plainSearch){
        this.col = 'All'
        return media.filter((i: { description: string; }) => md ?  i.description.includes(md) : true)
      }
      if(md === 'All') return [...media]
      return media.filter((i: { Mediatype: string; }) => md ?  i.Mediatype === md : true)
    }),
    catchError(err => {
      this.errormsg = 'an unexpected error occured please try again later'
      return throwError(err)
    })
  )

  constructor(private activatedRoute: ActivatedRoute, private _as:AuthService,
     private r:Router, private _ms:MediaService, public toastController: ToastController) {  }

  ngOnInit() {
   
  

  }

  

  async presentToastWithOptions(header, msg) {
    const toast = await this.toastController.create({
      header,
      cssClass: 'my-custom-class',
      message:msg,
      icon: 'information-circle',
      position: 'top',
      duration: 4000,
      mode:'ios',
      animated:true

    });
    await toast.present();
  }

  modifyProducts(meds: Imedia[], med: Imedia | number): Imedia[]{
    if (typeof(med) === 'object'){
      if(!this.updateMedia){
         let res = meds.filter(x => x.id === med.id).length //checking because it duplicates when you click the back btn after uploading
         if(!res){
          this.presentToastWithOptions('uploaded', 'media uploaded successfully')
          return [med, ...meds]
         }
         return 
          
      }


      let index: number = meds.findIndex(media => media.id === med.id)
      meds[index].title = med.title
      meds[index].description = med.description
      this.updateMedia = false;
      this.presentToastWithOptions('updated', 'media updated successfully')
      return [...meds]
     
    }

      let index: number = meds.findIndex(media => media.id === med)
      meds.splice(index, 1)
      this.presentToastWithOptions('deleted', 'media deleted successfully')

      return [...meds];
  }

  ionViewWillEnter(){
    this._as.getLoggedInUser().subscribe(
      res => {
        this.currentUser = res;
      }
    )

    let info = {...history.state}
    
    if(info.media){
      console.log(info.media)
        if(info.update){
          this.updateMedia = true
        }
      this.insertedmedia.next(info.media);
    }

  

  }

  upload(){
    if(this.currentUser){
      this.r.navigateByUrl('/folder/upload')
    }else{
      this.r.navigateByUrl('/folder/login')
    }
  }

  toggleInput(){
    if(this.search){
      this.col = ''
    }
    this.search = !this.search
  }

  plain(event){
    this.searchedptn.next(this.plainSearch)
  }


  fire(data){
    this.plainSearch = ''
    this.col = data
    this.searchedptn.next(data)
  }


  route(data){
    

    let info = {data, me:false}
    if(data.user.id === this.currentUser){
      info.me = true
    }
    this.r.navigateByUrl('/folder/detail', {state: info})

  }




}
