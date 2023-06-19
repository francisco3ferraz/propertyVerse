import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['map', 'property'];

    connect() {
        this.initializeMap();
        document.addEventListener('turbo:load', this.initializeMap.bind(this));
    }

    initializeMap() {
        
        if (!this.mapTarget) return;

        window.initMap = this.createMap.bind(this);

        if (typeof google !== 'undefined') {
            this.createMap();
        }
    }

    createMap() {
        this.mapTarget.style.height = "100%";
        const firstProperty = this.propertyTargets[0];
        const firstPosition = { lat: parseFloat(firstProperty.dataset.latitude), lng: parseFloat(firstProperty.dataset.longitude) }

        const map = new google.maps.Map(this.mapTarget, {
            center: firstPosition,
            zoom: 12,
        });

        this.propertyTargets.forEach((property) => {
            const position = { lat: parseFloat(property.dataset.latitude), lng: parseFloat(property.dataset.longitude) }
            const marker = new google.maps.Marker({
                position,
                map,
            });

            const contentString = `
                    <div>
                        <img src="${property.dataset.picture}" alt="${property.dataset.name}" class="rounded-lg w-28 h-20">
                    </div>
            `;

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
                maxHeight: 150,
            });

            marker.addListener("mouseover", () => {
                infowindow.open(map, marker);
            });

            marker.addListener("mouseout", () => {
                infowindow.close(map, marker);
            });

            marker.addListener("click", () => {
                window.location.assign(property.dataset.propertyurl);
            });
        });
    }
}