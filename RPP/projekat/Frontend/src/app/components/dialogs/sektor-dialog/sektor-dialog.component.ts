
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule,MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Sektor } from 'src/app/models/sektor';
import {SektorService } from 'src/app/services/sektor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';



@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})

export class SektorDialogComponent implements OnInit {

  preduzeca:Preduzece[]=[];
  public flag: number;
  //preduzeceService: any;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SektorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sektor,
              public sektorService: SektorService,
              public preduzeceService: PreduzeceService) { }



  ngOnInit(): void {
    this.preduzeceService. getAllPreduzece()
    .subscribe( preduzeca =>{
      this.preduzeca=preduzeca
    })
  }



  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void{
    this.sektorService.addSektor(this.data)
    .subscribe(data=>{
    this.snackBar.open('Uspesno dodato sektor:'+this.data.naziv, 'U redu',{
      duration:2500})
    }),

  (error:Error)=>{
    this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
      duration:2500
    })
  };
  
    
  }

public update():void{
  this.sektorService.updateSektor(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno ste modifikovali sektor:'+ this.data.naziv,'U redu',{
        duration:2500
    });
  }),
    
      (error:Error)=>{
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
          duration:2500
        });

    };
}

public delete():void{
  this.sektorService.deleteSektor(this.data.id)
  .subscribe(()=>{
    this.snackBar.open('Uspesno obrisano sektor','U redu',{
      duration:2500
    });
  }),
  
  (error:Error)=>{
    this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
      duration:2500
    });
}

}

public cancel():void{
  this.dialogRef.close();
  this.snackBar.open('Odustali ste od izmena','U redu',{
    duration:1000
});


}



}


