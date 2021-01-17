import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { of, Observable } from 'rxjs';
import { CrudService } from '../core/service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  highlights: any[] = [];
  dp$: Observable<String> | undefined;
  d: string = '';
  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getHighlights();
  }

  getHighlights() {
    const alphabets = ['war'];
    for(const str of alphabets) {
      this.crudService.getData(`s=${str}&y=2020`).subscribe(
        data => {
          console.log(data);
          this.highlights.push(data.Search);
          this.highlights = data.Search.map(
            (mov: any) => {
              return {path: mov.Poster}
            }
          );
          this.d = this.highlights[0].Poster;
          this.dp$ = of(this.highlights[0].Poster);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
