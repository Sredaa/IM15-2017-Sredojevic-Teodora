import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { ObrazovanjeDialogComponent } from '../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit, OnDestroy {


  displayedColumns=['id','naziv','stepen_strucne_spreme','opis','actions'];
  
  dataSource!:MatTableDataSource<Obrazovanje>;
  //dataSource?: MatTableDataSource<Obrazovanje>;

  subscription: Subscription;
  @ViewChild(MatSort,{static:false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;

  constructor(private obrazovanjeService: ObrazovanjeService,
      public dialog:MatDialog) { }

  ngOnInit(): void {
      this.loadData();
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


  public loadData(){
    this.subscription=this.obrazovanjeService.getAllObrazovanje()
    .subscribe(data=>{
        //console.log(data);
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    }),
    (error: Error) => {

      console.log(error.name+''+error.message);
    }
  }

  public openDialog(flag:number, id?:number,naziv?:string,stepenStrucneSpreme?:string,opis?:string){
    const dialogRef=this.dialog.open(ObrazovanjeDialogComponent,{data:{id,naziv,stepenStrucneSpreme,opis}});
    dialogRef.componentInstance.flag=flag;
    dialogRef.afterClosed()
    .subscribe(result => {
        if(result===1){
          this.loadData();
        }
    })
  }
applyFilter(filteValue:string){
  filteValue=filteValue.trim();
  filteValue=filteValue.toLocaleLowerCase();
  this.dataSource.filter=filteValue;
}

}
