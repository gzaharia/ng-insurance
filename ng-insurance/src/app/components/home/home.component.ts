import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Insurance} from '../../model/insurance/insurance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private insurances: Insurance[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.insurances = this.route.snapshot.data.insurances;

    for (let j = this.insurances.length - 1; j >= 0; j--) {
      if (this.insurances[j].status === 'DELETED') {
        this.insurances.splice(j, 1);
      }
    }
  }

}
