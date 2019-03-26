import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-packageselect',
  templateUrl: './packageselect.component.html',
  styleUrls: ['./packageselect.component.scss']
})
export class PackageselectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
