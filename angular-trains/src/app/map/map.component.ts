import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {MouseEvent, GoogleMapsAPIWrapper} from "@agm/core";
import {StationsService} from "./stations.service";
import {Response} from "@angular/http";
import {Station} from "./Station";
import {MessageService} from "../message.service";
import {Subscription} from "rxjs";
import {isUndefined, isNullOrUndefined} from "util";
declare var google: any;

@Component({
  selector: "google-map",
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class TrainsGoogleMap implements OnInit {

  // google maps zoom level
  zoom: number = 7;

  // initial center position for the map
  lat: number = 46.0008141;
  lng: number = 24.2705566;

  markers: marker[] = new Array();
  stationList: Station[] = new Array();
  details = "detalii...";

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ` + index);

    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].isOpen = false;
    }

    this.markers[index].isOpen = true;
    this.details = label;
    this.cdRef.detectChanges();

  }

  mapClicked($event: MouseEvent) {
  }

  message: string;
  subscription: Subscription;

  constructor(private stationsService: StationsService, private cdRef: ChangeDetectorRef, private messageService: MessageService, private gmapsApi: GoogleMapsAPIWrapper) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
      this.markers = [];
      console.log("message: " + message.text);

      if (message.text === "clear") {
        this.markers = [];
      } else {

        let search = message.text.split(":");
        if (search[0] === 'anything' && search[1] === 'anything') {
          this.getAllStations();
        } else {
          this.findStations(search[0], search[1]);
        }
      }

    })

  }

  ngOnInit() {

  }

  findStations(source: string, destintion: string) {
    this.markers = [];
    this.stationsService.findSourceDestination(source.trim(), destintion.trim()).subscribe((data: Response) => {
      console.log("am gasit sursa: + " + data.results.bindings);
      if (!isUndefined(data) && data.results.bindings != []) {
        debugger;
        let sourceURI = "";
        let destURI = "";
        console.log("source: " + sourceURI);

        let foundS: boolean = false;
        let foundD: boolean = false;
        for (let entry of data.results.bindings) {
          let uri = entry['sub']['value'].split("_")[1];
          let value: string = entry['object']['value'];
          if (value.indexOf(source) !== -1 && !foundS) {
            sourceURI = uri;
            foundS = true;
          }

          if (value.indexOf(destintion) !== -1 && !foundD) {
            destURI = uri;
            foundD = true;
          }
        }

        console.log("s: " + sourceURI, "D: " + destURI);

        this.stationsService.findTrain(sourceURI, destURI).subscribe(train => {
          for (let entry of train.results.bindings) {
            let uri: string = entry['sub']['value'];
            let stations: string = entry['obj']['value'];

            let indexS = stations.indexOf(sourceURI);
            let indexD = stations.indexOf(destURI);
            if (indexD > indexS) {
              console.log("AM GASIT TREN......" + uri);
              console.log("statii: " + stations);
              this.showTrainRoute(stations, sourceURI, destURI);
            }
          }
        })

      }
    });
  }


  showTrainRoute(listStations: string, source: string, dest: string) {

    let stationsString: string = (listStations.split("[")[1]).split("]")[0];
    let stations: string [] = stationsString.substring(stationsString.indexOf(source)).split(",");

    console.log("-> " + stations);
    let index = 0;
    for (let entry of stations) {
      if (entry.indexOf(dest) !== -1) {
        break;
      }
      this.stationsService.findOneStation(entry.trim()).subscribe(data => {
        if (!isNullOrUndefined(data)) {
          let oldS: Station = new Station();
          let resultL = data.results.bindings;
          for (let entry of resultL) {
            let val: string = entry['prop']['value'];
            if (val.indexOf("LAT") !== -1) {
              oldS.lat = entry['obj']['value'];
            }
            else if (val.indexOf("LON") !== -1) {
              oldS.long = entry['obj']['value'];
            } else if (val.indexOf('Country') !== -1) {
              oldS.fullName = entry['obj']['value'];
            }
          }
          this.markers.push({
            lat: parseFloat(oldS.lat),
            lng: parseFloat(oldS.long),
            label: oldS.fullName,
            draggable: false
          });

          this.stationList.push(oldS);
        }
      });
    }
  }

  getAllStations() {
    this.stationsService.getAllStations().subscribe((data: Response) => {

      console.log("Receive data: " + data);

      let listStations: Station[] = new Array();

      let resultL = data.results.bindings;
      console.log("####### Receive data:" + resultL.length);

      for (let entry of resultL) {
        let uri = entry['sub']['value'];
        if (this.containsInList(listStations, uri)) {
          let index = this.getIndexOfArray(listStations, uri);
          // console.log("FOUND.... " + index);

          let oldS: Station = listStations[index];
          listStations.splice(index,1);
          // console.log(oldS.uri);
          //  debugger;
          //
          let val: string = entry['prop']['value'];

          if (val.indexOf("LAT") !== -1) {
            oldS.lat = entry['obj']['value'];
          }
          else if (val.indexOf("LON") !== -1) {
            oldS.long = entry['obj']['value'];
          } else if (val.indexOf('Country') !== -1) {
            oldS.fullName = entry['obj']['value'];
          }

          listStations.push(oldS);

        } else {
          let s: Station = new Station();
          s.uri = uri;

          let val: string = entry['prop']['value'];

          if (val.indexOf("LAT") !== -1) {
            s.lat = entry['obj']['value'];
          } else if (val.indexOf("LON") !== -1) {
            s.long = entry['obj']['value'];
          } else if (val.indexOf('Country') !== -1) {
            s.fullName = entry['obj']['value'];
          }

          listStations.push(s);
        }
      }

      for (let entry of listStations) {
        this.markers.push({
          lat: parseFloat(entry.lat),
          lng: parseFloat(entry.long),
          label: entry.fullName,
          draggable: false,
          isOpen: false
        });

      }
      console.log("------------ ", this.markers.length)
      this.cdRef.detectChanges();
    });

  }

  getIndexOfArray(list: Array, uri: string): any {
    let index = 0;
    for (let entry of list) {
      if (entry.uri == uri) {
        return index;
      }
      index++;
    }
    return 0;

  }

  containsInList(list: Array, uri: string): boolean {
    for (let entry of list) {
      if (entry.uri === uri) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
  }

  showDetails() {
    console.log("click on marker");
    // this.details = this.stationList[]
  }

  ngAfterViewInit(): void {
    console.log("initialization");
  }

  // markers: marker[] = [
  //   {
  //     lat: 44.96518,
  //     lng: 25.970816,
  //     label: 'A',
  //     draggable: true
  //   },
  //   {
  //     lat: 44.4458851,
  //     lng: 26.0727263,
  //     label: 'B',
  //     draggable: false
  //   }
  // ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isOpen?: boolean;

}
