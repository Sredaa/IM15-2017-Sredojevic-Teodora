import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Preduzece } from 'src/app/models/preduzece';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns=['id','naziv','pib','sediste','opis','actions'];
  
  dataSource!:MatTableDataSource<Preduzece>;

  subscription: Subscription;
  @ViewChild(MatSort,{static:false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator;



  constructor(private preduzeceService: PreduzeceService,
      public dialog:MatDialog) { }

  ngOnInit(): void {
      this.loadData();
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


  public loadData(){
    this.subscription=this.preduzeceService.getAllPreduzece()
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

  public openDialog(flag:number, id?:number,naziv?:string,pib?:number,sediste?:string,opis?:string){
    const dialogRef=this.dialog.open(PreduzeceDialogComponent,{data:{id,naziv,pib,sediste,opis}});
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


