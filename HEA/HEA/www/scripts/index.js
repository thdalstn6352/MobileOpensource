﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    // Like any Cordova plugin, you must wait for deviceready before referencing the plugin
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        /**
  * Create google maps Map instance.
  * @param {number} lat
  * @param {number} lng
  * @return {Object}
  */
        const createMap = ({ lat, lng }) => {
            return new google.maps.Map(document.getElementById('map'), {
                center: { lat, lng },
                zoom: 15
            });
        };

        /**
         * Create google maps Marker instance.
         * @param {Object} map
         * @param {Object} position
         * @return {Object}
         */
        const createMarker = ({ map, position }) => {
            return new google.maps.Marker({ map, position });
        };

        /**
         * Track the user location.
         * @param {Object} onSuccess
         * @param {Object} [onError]
         * @return {number}
         */
        const trackLocation = ({ onSuccess, onError = () => { } }) => {
            if ('geolocation' in navigator === false) {
                return onError(new Error('Geolocation is not supported by your browser.'));
            }

            return navigator.geolocation.watchPosition(onSuccess, onError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        };

        /**
         * Get position error message from the given error code.
         * @param {number} code
         * @return {String}
         */
        const getPositionErrorMessage = code => {
            switch (code) {
                case 1:
                    return 'Permission denied.';
                case 2:
                    return 'Position unavailable.';
                case 3:
                    return 'Timeout reached.';
            }
        }

        /**
         * Initialize the application.
         * Automatically called by the google maps API once it's loaded.
        */
        function init() {
            const initialPosition = { lat: 59.32, lng: 17.84 };
            const map = createMap(initialPosition);
            const marker = createMarker({ map, position: initialPosition });
            const $info = document.getElementById('info');

            let watchId = trackLocation({
                onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
                    marker.setPosition({ lat, lng });
                    map.panTo({ lat, lng });
                    $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
                    $info.classList.remove('error');
                },
                onError: err => {
                    console.log($info);
                    $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
                    $info.classList.add('error');
                }
            });
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();