const main = function() {
    return {
        hw() {
            return 'hello-world';
        },

        init(osmId) {

            console.log('init()', osmId);

            const osmDiv = document.getElementById(osmId);
            console.log('osm', osmDiv);

            var map = L.map(osmDiv);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var target = L.latLng('42.881742', '-9.271396');
            map.setView(target, 14);

            L.marker(target).addTo(map);

            console.log('init.');
        }
    };
}();