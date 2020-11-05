import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activateRouter: ActivatedRoute,
              private peliculaService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const { id } = this.activateRouter.snapshot.params;

    combineLatest([

      this.peliculaService.getPeliculaDetalle( id ),
      this.peliculaService.getCast( id )

    ]).subscribe( ([pelicula, cast]) => {

      if ( !pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula = pelicula;
      this.cast = cast.filter( actor => actor.profile_path !== null);
    });

  }

  // ESTO ES LO MISMO LO DE ARRIBA, SE USO "combineLatest" Para combinar  OBSERVABLES, se puede colocar cualquier cantidad de observables
/*     this.peliculaService.getPeliculaDetalle( id ).subscribe(movie => {
    if ( !movie) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.pelicula = movie;
  });

    this.peliculaService.getCast( id ).subscribe( cast => {
    console.log(cast);
    this.cast = cast.filter( actor => actor.profile_path !== null)
  }); */



  onRegresar(){
    this.location.back();

  }

}
