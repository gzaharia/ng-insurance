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
  private insurances: Insurance[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.insurances = this.route.snapshot.data.insurances;
    this.route.queryParams.subscribe(params => {
      if (params.success === 'true') {
        this.toast.success('Comanda dumneavoastră a fost plasată cu succes!', 'Succes!');
      }
    });

    // for (let j = this.insurances.length - 1; j >= 0; j--) {
    //   if (this.insurances[j].status === 'DELETED') {
    //     this.insurances.splice(j, 1);
    //   }
    // }
  }

}
