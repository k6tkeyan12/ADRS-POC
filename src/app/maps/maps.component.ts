import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnChanges, OnInit {

    @Input() accidentData: any;
    @Input() mapLatLong: any;
    _accidentData = [];
    _mapLatLong = [];
    constructor() { }
    ngOnChanges(changes: SimpleChanges) {
        this._accidentData = changes.accidentData.currentValue;
        this._mapLatLong = changes.mapLatLong.currentValue;
    }

    ngOnInit() {
        setTimeout(() => {
            // var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
            var mapOptions = {
                zoom: 8,
                center: { lat: -33.9, lng: 151.2 }
            };
            var image = {
                // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                size: new google.maps.Size(20, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32)
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            // validate today date
            const isToday = (someDate) => {
                const today = new Date()
                return someDate.getDate() == today.getDate() &&
                    someDate.getMonth() == today.getMonth() &&
                    someDate.getFullYear() == today.getFullYear()
            }

            for (var index of this._mapLatLong) {
                // console.log('index', index);
                // console.log('Date', new Date());
                // console.log('isToday', isToday(new Date(index.date)));
                var marker = new google.maps.Marker({
                    position: { lat: parseInt(index.lat), lng: parseInt(index.long) },
                    map: map,
                    // icon: image,
                    // shape: shape,
                    title: index.name
                });
                var contentString = ` 
                <div>Owner : ${index.name} <br>
                vehicle : ${index.vehicle} <br>
                date & time : ${index.date} : ${index.time} <br>
                <a href="http://localhost:4200/todaylist">View more</a>
                </div>
                `;

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
                    return function () {
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    };
                })(marker, contentString, infowindow));
            }

            // To add the marker to the map, call setMap();
            marker.setMap(map);

        }, 2000);
    }

}
