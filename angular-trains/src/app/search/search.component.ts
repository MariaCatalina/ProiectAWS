import {OnInit, Component} from "@angular/core";
import {StationsService} from "../map/stations.service";
import {sourceInfo} from "@angular/compiler-cli/src/metadata/evaluator";
import {Response} from "@angular/http";
import {MessageService} from "../message.service";
@Component({
  selector: "search-filter",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchFilter implements OnInit {
  source = "";
  destination = "";

  constructor(private messageService: MessageService){

  }

  public searchBtnFunc() {
    console.log("search clicked");
    if (this.source === '' && this.destination === '') {
      this.messageService.sendMessage("anything:anything");
    } else {
      this.messageService.sendMessage(this.source + ":" + this.destination);
    }
  }

  public clearBtnFunc() {
    this.messageService.sendMessage("clear");
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }
}
