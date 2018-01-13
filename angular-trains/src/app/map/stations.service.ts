import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Rx"
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpParams} from "@angular/common/http";
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {URLSearchParams, Response, Response} from "@angular/http";
import {Station} from "./Station";

/**
 * Created by Cata on 1/13/2018.
 */

const SERVER_URL = "http://192.168.163.131:8080/marmotta/sparql/select";

@Injectable()
export class StationsService {
  listStations: Station[] = new Array();

  constructor(private http: HttpClient) {
  }

  getAllStations(): Observable<Response> {
    let query: string = "SELECT * WHERE { ?sub ?prop ?obj .FILTER (contains(?sub, 'Station')) } ";

    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    });

    let params = new HttpParams().set('query',query).set('output', 'json');

    let options: HttpParamsOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(SERVER_URL, options);
  }


  findStations(source: string, destination: string) {
    console.log("find stations");

  }

  findSourceDestination(source: string, destination: string): Observable<Response>{
    console.log("######## " + source + " ##### " + destination);
    let query: string = "SELECT * WHERE { " +
      "{?sub <http://www.w3.org/2001/vcard-rdf/3.0#STATION_ORIGIN> ?object .FILTER (contains(?object, '" + source.trim() + "' ))}"
      + " UNION " +
      "{?sub <http://www.w3.org/2001/vcard-rdf/3.0#STATION_ORIGIN> ?object .FILTER (contains(?object, '" + destination.trim() + "' ))}" +
      "} LIMIT 1000";


    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    });

    let params = new HttpParams().set('query',query).set('output', 'json');

    let options: HttpParamsOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(SERVER_URL, options);
  }

  findTrain(source: string, dest: string): Observable<Response>{
    let query: string = "SELECT * WHERE { ?sub <http://www.w3.org/2001/vcard-rdf/3.0#TRAIN_STATIONS> ?obj" +
      " .FILTER (contains(?obj," + source + ")) " +
      " .FILTER (contains(?obj," +  dest + ")) " + "}";

    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    });

    let params = new HttpParams().set('query',query).set('output', 'json');

    let options: HttpParamsOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(SERVER_URL, options);
  }

  findOneStation(stationNumber: string){
    let query: string = "SELECT * WHERE { <http://opendata.cs.pub.ro/resource/Station_" + stationNumber +"> ?prop ?obj" + "}";

    let headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/sparql-results+json'
    });

    let params = new HttpParams().set('query',query).set('output', 'json');

    let options: HttpParamsOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(SERVER_URL, options);
  }

}
