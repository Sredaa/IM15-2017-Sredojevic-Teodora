
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule,MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Radnik } from 'src/app/models/radnik';
import { RadnikService } from 'src/app/services/radnik.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Sektor } from 'src/app/models/sektor';
import { SektorService } from 'src/app/services/sektor.service';



@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  public flag: number;
  sektori:Sektor[]=[];


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Radnik,
              public radnikServis: RadnikService,
              public sektorService:SektorService) { }

  ngOnInit(): void {
    this.sektorService.getAllSektor()
    .subscribe(sektori=>{
      this.sektori=sektori
    })
  }

  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void{
    this.radnikServis.addRadnik(this.data)
    .subscribe(data=>{
    this.snackBar.open('Uspesno dodato radnik:'+this.data.ime, 'U redu',{
      duration:2500})
    }),

  (error:Error)=>{
    this.snackBar.open('Dogodila se greska. Pokusajte ponovo','Zatvori',{
      duration:2500
    })
  };
  
    
  }

public update():void{
  this.radnikServis.updateRadnik(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno ste modifikovali radnik:'+data.ime,'U redu',{
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
  this.radnikServis.deleteRadnik(this.data.id)
  .subscribe(()=>{
    this.snackBar.open('Uspesno obrisano radnik','U redu',{
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
