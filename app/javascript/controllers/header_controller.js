import { Controller } from "@hotwired/stimulus"
import { toggle } from 'el-transition'

export default class extends Controller 
{
    static targets = ['openUserMenu', 'userAuthLink'];

    // connect event listeners
    connect()
    {
        // toggle the dropdown menu on click
        this.openUserMenuTarget.addEventListener('click', this.toggleDropdownMenu);

        // show the user authentication modal on click
        this.userAuthLinkTargets.forEach((link) => {
            link.addEventListener('click', (e) => {
                document.getElementById('user-auth-modal-trigger').click();
            })
        })
    }

    // toggle the dropdown menu
    toggleDropdownMenu()
    {
        toggle(document.getElementById('menu-dropdown-items'));
    }
}
