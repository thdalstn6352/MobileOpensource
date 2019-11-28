
    // On vérifie si le navigateur supporte la géolocalisation
    if (navigator.geolocation) {

        function hasPosition(position) {
            // Instanciation
            var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),

            // Ajustage des paramètres
            myOptions = {
                zoom: 15,
                center: point,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },

            // Envoi de la carte dans la div
            mapDiv = document.getElementById("map"),
            map = new google.maps.Map(mapDiv, myOptions),

            marker = new google.maps.Marker({
                position: point,
                map: map,
                // Texte du point
                title: "You are here!"
            });
        }
        navigator.geolocation.getCurrentPosition(hasPosition);
    }