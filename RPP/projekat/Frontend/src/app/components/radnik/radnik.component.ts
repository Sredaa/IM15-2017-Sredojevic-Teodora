import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from 'src/app/models/radnik';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Sektor } from 'src/app/models/sektor';


@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  displayedColumns=['id','ime','prezime','brojLk','obrazovanje','sektor','actions'];
  
  dataSource!:MatTableDataSource<Radnik>;

  subscription: Subscription;
  @ViewChild(MatSort,{static:false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;



  constructor(private radnikService: RadnikService,
      public dialog:MatDialog) { }

  ngOnInit(): void {
      this.loadData();
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


  public loadData(){
    this.subscription=this.radnikService.getAllRadnik()
    .subscribe(data=>{
        //console.log(data);
        this.dataSource=new MatTableDataSource(data);
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    }),
    (error: Error) => {

      console.log(error.name+''+error.message);
    }
  }

  public openDialog(flag:number, id?:number,ime?:string,prezime?:string,brojLk?:number,obrazovanje?:Obrazovanje,sektor?:Sektor){
    const dialogRef=this.dialog.open(RadnikDialogComponent,{data:{id,ime,prezime,brojLk,obrazovanje,sektor}});
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


