import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule,MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeServis: ObrazovanjeService) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.obrazovanjeServis.addObrazovanje(this.data)
    .subscribe(data=>{
    this.snackBar.open('Uspesno dodato obrazovanje:'+this.data.naziv, 'U redu',{
      duration:2500})
    }),

  (error:Error)=>{
    this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
      duration:2500
    })
  };
  
    
  }

public update():void{
  this.obrazovanjeServis.updateObrazovanje(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno ste modifikovali obrazovanje:'+data.naziv,'U redu',{
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
  this.obrazovanjeServis.deleteObrazovanje(this.data.id)
  .subscribe(()=>{
    this.snackBar.open('Uspesno obrisano obrazovanje','U redu',{
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
