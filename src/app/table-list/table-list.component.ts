import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Rx';
import {MatTableDataSource} from '@angular/material/table';
//import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface PeriodicElement {
  vehicle: string;
  owner: string;
  contact: number;
  severity: string;
}
export interface DialogData {
  time: string;
  date: string;
  lat:string;
  long:string;
  vehicle: string;
  owner: string;
  contact: number;
  severity: string;
  owneradd:string;
  noperson:number;
  image:any;
  audio:string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
 
  time: string;
  date: string;
  lat:string;
  long:string;
  accidentdate:string;
  policeaddress:string;
  vehicle: string;
  owner: string;
  contact: number;
  severity: string;
  owneradd:string;
  noperson:number;
  image:any;
  audio:string;
  

  displayedColumns: string[] = ['vehicle', 'owner','contact','severity'];

  accidentData = [];
  accidentDatareport = [];
  dataSource:any;
  //dataSource = new MatTableDataSource(this.accidentData);

  

  constructor(private http: Http,public dialog: MatDialog,private route: ActivatedRoute) { }

  ngOnInit() {
     
    /*this.route.paramMap.subscribe(params => {
      console.log(params.keys);
    })*/

    this.getAccidentData().subscribe(data => {
      console.log(this.route.snapshot.url[0].path);
      if(this.route.snapshot.url[0].path == "todaylist"){
      
      let now = new Date();
      let date=now.getDate();
      let month=now.getMonth()+1;
      let year=now.getFullYear()
      let datefinal=date+"/"+month+"/"+year
      //console.log(datefinal);
      for(var i=0;i<data.length;i++){
        if(datefinal==data[i].date){
         console.log(datefinal);
         this.accidentData.push(data[i]);
        }
      }
      this.dataSource = new MatTableDataSource(this.accidentData);
    }
    else{
      console.log("datatablellist");
      this.accidentData = data;
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
      /*this.accidentData = data
      this.totalaccident = this.accidentData.length;
      this.curentMonthAccident = 0;
      this.averageReportingTime = 10;
      this.totalLifeSaves = 10;
      for ( var accident of this.accidentData){
        this.mapLatLong.push({
          'name': accident.owner,
          'lat': accident.lat,
          'long': accident.long
        });
      }
    
      console.log(this.accidentData,'----------',this.mapLatLong);*/
    }
    }, error => console.log(error));

  
  }
  getAccidentData(): Observable<any> {
    return this.http.get("assets/accident/1.json")
      .map((res: any) => res.json());
    // .catch((error:any) => console.log(error));

  }
  accidentreportpopup(acc){
    //alert("popreport");
    console.log(acc);
    this.accidentDatareport=[];
    this.accidentdate=acc.date;
    this.time=acc.time;
    this.lat=acc.lat;
    this.long=acc.long;
    this.policeaddress=acc.policeaddress;
    this.vehicle= acc.vehicle;
    this.owner= acc.owner;
    this.contact= acc.contact;
    this.severity= acc.severity;
    this.owneradd=acc.owneradd;
    this.noperson=acc.noperson;
    this.image=acc.image;
    this.audio=acc.audio;

    debugger;
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: {date: this.accidentdate, time: this.time,lat:this.lat,long:this.long,policeaddress:this.policeaddress,vehicle:this.vehicle,owner:this.owner,contact:this.contact,severity:this.severity,owneradd:this.owneradd,noperson:this.noperson,image:this.image,audio:this.audio}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.time = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }
}
