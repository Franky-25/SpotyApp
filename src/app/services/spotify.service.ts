import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Servicio Spotify listo...')
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDfWFfbbS-cghi-jH2-0zkQhN1xn1p3QQs7VwLitXAY2ogwfgMcSVZc33YV4tLF9qXEDgEdH7SMUZ5HKLySLfbUDLKG7mXgEkwUb9395FnzWP0X6SbC'
    });

    return this.http.get( url, { headers });
    
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases')
               .pipe( map( data => data['albums'].items ));
               
  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino } &type=artist&limit=15`)
               .pipe( map( data => data['artists'].items ));

  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
              //  .pipe( map( data => data['artists'].items ));

  }

  getTopTracks( id: string ){

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
               .pipe( map( data => data['tracks'] ));

  }
}
