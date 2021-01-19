import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CrudService } from '../core/service/crud.service';

interface IMovie {
  Poster: '',
  Title: '',
  Year: '',
  Type: '',
  imdbID: ''
}

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  searchForm!: FormGroup;
  searchResult: any[] = [];
  nomination: any[] = [];
  nominationList: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackbarRef: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('nominations') !== null){
      this.alreadyNominated();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.searchForm = this.fb.group({
      title: [null, Validators.required],
      type: [null, Validators.required],
      year: [null]
    });
    this.searchForm.patchValue({
      type: 'movie',
      year: '2020'
    })

  }

  alreadyNominated() {
    const a: any = localStorage.getItem('nominations');
    this.nominationList = JSON.parse(a)
  }

  get searchFormData() {
    return this.searchForm.controls;
  }

  onSubmit(formPayload: any) {
    console.log(formPayload);
    this.searchForMovie(formPayload);
  }

  searchForMovie(formpayload: any) {
    const url = formpayload.year.value !== ''
    ? `s=${formpayload.title.value}&y=${formpayload.year.value}&t=${formpayload.type.value}`
    : `s=${formpayload.title.value}&t=${formpayload.type.value}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        this.searchResult = data.Search;
      },
      error => {
        console.log(error);
      }
    );
  }

  addNomination(movie: IMovie) {
    if (this.nomination.length < 5) {
      this.nomination.push(movie);
      this.snackbarRef = this.snackBar.open(
        `${movie.Title} Nominated`, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: 'primary'
        }
      )
    } else {
      this.snackbarRef = this.snackBar.open(
        `You have made five(5) nominations already`, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: 'primary'
        }
      )
    }
  }

  removeNomination(movie: IMovie, index: number) {
    this.nomination.splice(index, 1);
    this.snackbarRef = this.snackBar.open(
      `${movie.Title} Removed from Nominations`, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'primary'
      }
    )
  }

  submitNomination(movies: Array<IMovie>){
    this.snackbarRef = this.snackBar.open(
      `Congratulations! You have submitted your nomination`, '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'primary'
      }
    )
    localStorage.setItem('nominations', JSON.stringify(movies));
    this.alreadyNominated();
  }

}
