import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  collapsed = true;

  selectFeature(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
