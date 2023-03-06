import { Controller } from "@hotwired/stimulus"
import { getDistance, convertDistance } from 'geolib';
import { isEmpty } from 'lodash-es';

export default class extends Controller
{
    // Define the controller's HTML targets
    static targets = ['property'];

    // When the controller is connected to the page, check if user coordinates are available, otherwise ask for them
    connect()
    {
        if (isEmpty(this.element.dataset.latitude) && isEmpty(this.element.dataset.longitude))
        {
            // Get the user's coordinates using their device's geolocation
            window.navigator.geolocation.getCurrentPosition((position) =>
            {
                // Set the user's coordinates in the dataset and calculate distance
                this.setUserCoordinates(position.coords);
                this.setDistanceText();
            });
        } else {
            // The user's coordinates are already in the dataset, calculate distance
            this.setDistanceText();
        }
    }

    // Set the user's coordinates in the dataset
    setUserCoordinates(coordinates)
    {
        this.element.dataset.latitude = coordinates.latitude;
        this.element.dataset.longitude = coordinates.longitude;
    }

    // Get the user's coordinates from the dataset
    getUserCoordinates()
    {
        return {
            latitude: this.element.dataset.latitude,
            longitude: this.element.dataset.longitude,
        };
    }

    // Calculate the distance from the user's location to each property and display it in the HTML
    setDistanceText()
    {
        this.propertyTargets.forEach((propertyTarget) => {
            // Calculate the distance in meters
            let distanceFrom = getDistance(
                this.getUserCoordinates(),
                { latitude: propertyTarget.dataset.latitude, longitude: propertyTarget.dataset.longitude },
            );
            // Convert the distance to kilometers and update the HTML
            propertyTarget.querySelector('[data-distance-away]').innerHTML = `${Math.round(convertDistance(distanceFrom, 'km'))}km away`;
        });
    }
}
