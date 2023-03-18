
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  mensajeError: string;
  error: boolean;

  constructor( private spotify: SpotifyService ) { 

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {

          console.log( data );
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio => {
        
          this.loading = false;
          this.error = true;
          console.log( errorServicio );
          this.mensajeError = errorServicio.error.error.message;
            
        }))
  
   
  }


}
