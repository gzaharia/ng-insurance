import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Insurance} from '../../model/insurance/insurance';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  insurances: Insurance[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.insurances = this.route.snapshot.data.insurances;
    this.route.queryParams.subscribe(params => {
      if (params.success === 'true') {
        this.toast.success('Comanda dumneavoastră a fost plasată cu succes!', 'Succes!');
      }
    });
  }

}
