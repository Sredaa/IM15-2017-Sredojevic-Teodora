import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule,MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import {PreduzeceService } from 'src/app/services/preduzece.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Preduzece,
              public preduzeceServis: PreduzeceService) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.preduzeceServis.addPreduzece(this.data)
    .subscribe(data=>{
    this.snackBar.open('Uspesno dodato preduzece:'+this.data.naziv, 'U redu',{
      duration:2500})
    }),

  (error:Error)=>{
    this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
      duration:2500
    })
  };
  
    
  }

public update():void{
  this.preduzeceServis.updatePreduzece(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno ste modifikovali preduzece:'+ this.data.naziv,'U redu',{
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
  this.preduzeceServis.deletePreduzece(this.data.id)
  .subscribe(()=>{
    this.snackBar.open('Uspesno obrisano preduzece','U redu',{
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
