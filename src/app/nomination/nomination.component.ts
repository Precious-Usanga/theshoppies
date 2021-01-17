import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../core/service/crud.service';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  searchForm!: FormGroup;
  searchResult: any[] = [];
  nomination: any[] = [];
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      year: ['']
    });
    this.searchForm.patchValue({
      type: 'movie',
      year: '2020'
    })

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


}
