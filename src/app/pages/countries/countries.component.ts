import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpDataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  @ViewChild('countryForm', { static: false })
  countryForm: NgForm;

  countryData: Country;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.countryData = {} as Country;
  }

  ngOnInit(): void {
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;

    // Fetch all countries on Page load
    this.getAllCountries();
  }

  getAllCountries() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editCountry(element: Country) {
    this.countryData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.countryForm.resetForm();
  }

  deleteCountry(id: number) {
    this.httpDataService.deleteCountry(id).subscribe((response: any) => {
      this.getAllCountries();
    });
  }

  addCountry() {
    this.httpDataService
      .createCountry(this.countryData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map((o) => {
          return o;
        });
      });
    this.countryForm.resetForm();
  }

  updateCountry() {
    this.httpDataService
      .updateCountry(this.countryData.id, this.countryData)
      .subscribe((response: any) => {
        this.getAllCountries();
        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.countryForm.form.valid) {
      if (this.isEditMode) this.updateCountry();
      else this.addCountry();
    } else {
      alert('Enter valid data!');
    }
  }
}
