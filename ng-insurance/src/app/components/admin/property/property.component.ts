import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryPropertiesService} from 'src/app/service/category-properties/category-properties.service';
import {CategoryProperties} from 'src/app/model/category-properties/category-properties';
import {Category} from 'src/app/model/category/category';
import {Location} from '@angular/common'

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: CategoryProperties;
  categories: Category[] = [];
  title = '';
  coefficient: number;
  status: string = 'ACTIVE';
  showCategory = false;
  selectedCategory = '';
  id: number;
  changeProperty = false;
  propertyError = '';
  propertySuccess = '';
  changeCategory = false;
  oldTitle = '';

  constructor(
    public route: ActivatedRoute,
    public propertyService: CategoryPropertiesService,
    public _location: Location) {
    this.categories = this.route.snapshot.data.categories;
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProperty();
  }

  getProperty() {
    this.propertyService.getPropertyById(this.id).subscribe(res => {
        this.property = res;
        this.oldTitle = this.property.title;
        this.title = this.property.title;
        this.coefficient = this.property.coefficient;
        this.status = this.property.status;
        for (let category of this.categories) {
          for (let property of category.properties) {
            if (property.id == this.id) {
              this.selectedCategory = category.title + ' | ' + category.insuranceTitle;

              this.property.category = category;
            }
          }
        }
        this.showCategory = true;
      },
      err => {
        this.propertyError = 'Error to load data';
        this.errorMessage();
      });
  }

  updStatus(id) {
    this.status = id;
    this.property.status = id;
    this.changeProperty = true;
  }

  updProperty() {
    if ((this.title.trim().length && this.coefficient >= 1)) {
      if (this.changeProperty || this.changeCategory) {
        this.property.coefficient = this.coefficient;
        this.property.title = this.title;

        this.propertyService.putProperty(this.property.id, this.property).subscribe(res => {
            this._location.back();
            this.changeProperty = false;
            this.changeCategory = false;
            this.succesPropertyUpdate();
          },
          err => {
            this.propertyError = 'You data dono\' update !';
            this.errorMessage();
          });
      } else {
        this.propertyError = 'You have nothing to update !';
        this.errorMessage();
      }
    }
  }

  errorMessage() {
    document.getElementById('MessageError').style.display = 'block';
    setTimeout(function () {
      document.getElementById('MessageError').style.display = 'none';
    }, 3000);
  }

  onChangeProperty() {
    this.changeProperty = true;
  }


  succesPropertyUpdate() {
    if (this.property.title.trim().length && this.property.title) {
      this.propertySuccess = 'Updated successfully !';
      document.getElementById('MessageSuccess').style.display = 'block';
      setTimeout(function () {
        document.getElementById('MessageSuccess').style.display = 'none';
      }, 3000);
    }
  }

  updCategory(id) {
    this.changeCategory = true;
    this.selectedCategory = this.categories[id].title + " | " + this.categories[id].insuranceTitle;
    this.property.category = this.categories[id];
  }
}
