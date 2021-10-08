import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  instructions: string;
}

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingpageComponent {

  public recipes: {name: string, instructions: string}[] = [];
  public name: string = '';
  public instructions: string = '';

  constructor(
    public dialog: MatDialog, private cd:ChangeDetectorRef
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(recipeDialog, {
      width:'25%',
      data: {name: this.name, instructions: this.instructions,}
    });
    dialogRef.afterClosed().subscribe((result: {name: string, instructions: string}) => {
      this.recipes.push({name: result.name, instructions: result.instructions});
      this.cd.detectChanges();
      console.log('printing the recipes', this.recipes)
      console.log('printing the result', result)
    })
  }
}

@Component({
  selector: 'dialog-recipe-dialog',
  templateUrl: './addRecipeDialog.html',
})
export class recipeDialog {

  constructor(
    public dialogRef: MatDialogRef<recipeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}