import { Controller } from "@hotwired/stimulus"
import axios from 'axios';

export default class extends Controller
{
    // Define HTTP header
    HEADERS = { 'ACCEPT': 'application/json' }
    
    // Event handler function for favorite/unfavorite button
    favorite(e)
    {
        e.preventDefault();

        // Check if user is logged in
        if (this.element.dataset.userLoggedIn === 'false') {
            // Redirect to login page if user is not logged in
            return document.querySelector('[data-header-target="userAuthLink"]').click();
        }

        // If property is already favorited, then unfavorite it
        if (this.element.dataset.favorited === 'true') {
            this.unfavoriteProperty();
        } 
        // Otherwise favorite it
        else {
            this.favoriteProperty();
        }
    }

    // Return favorite API path
    getFavoritePath()
    {
        return '/api/favorites'
    }

    // Return unfavorite API path
    getUnfavoritePath(favoriteId)
    {
        return `/api/favorites/${favoriteId}`
    }

    // Send request to favorite a property
    favoriteProperty()
    {
        axios.post(this.getFavoritePath(), {
            user_id: this.element.dataset.userId,
            property_id: this.element.dataset.propertyId
        }, { 
            headers:  this.HEADERS
        }).then((response) => {
            // Update dataset and icon color
            this.element.dataset.favorited = 'true';
            this.element.dataset.favoriteId = response.data.id;
            this.element.setAttribute('fill', this.element.dataset.favoritedColor);
        });
    }

    // Send request to unfavorite a property
    unfavoriteProperty()
    {
        axios.delete(this.getUnfavoritePath(this.element.dataset.favoriteId), {     
            headers: this.HEADERS 
        }).then((response) => {
            // Update dataset and icon color
            this.element.dataset.favorited = 'false';
            this.element.dataset.favoriteId = '';
            this.element.setAttribute('fill', this.element.dataset.unfavoritedColor);
        })
    }
}
