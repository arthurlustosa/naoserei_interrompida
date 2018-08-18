import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DeputadoService} from '../../services/deputado.service';

@Component({
  selector: 'app-deputado-view',
  templateUrl: './deputado-view.component.html',
  styleUrls: ['./deputado-view.component.scss']
})
export class DeputadoViewComponent implements OnInit {

  deputado: any;

  constructor(private route: ActivatedRoute,
              private deputadoService: DeputadoService) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.deputadoService.getDeputado(params['id']).subscribe(
        data => this.deputado = data,
        error => console.log(error)
      )
    );
  }

}
