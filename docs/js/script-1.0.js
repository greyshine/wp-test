const main = function() {

    const partPages = [];
    const partJavascripts = [];

    async function load(url, fctContent) {
        try {
            const response = await fetch(url);
            let data = await response.text();
            fctContent(data);
        } catch (err) {
            console.error(err);
        }
    }

    function initMap(mapId, latString, lonString) {

            // init map
            const osmDiv = document.getElementById('osm-map');
            console.log('osm', osmDiv);

            var map = L.map(osmDiv);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var target = L.latLng(latString, lonString);
            map.setView(target, 14);

            L.marker(target).addTo(map);
            console.log('map loaded');
    };

    return {

        hw() {
            return 'hello-world';
        },

        register(...items) {

            console.log('register()', items);

            for(let i in items) {

                const item = items[i];

                if ( typeof item != 'string' ) {
                    console.error('bad type: item');
                } else if ( item.endsWith('.js') ) {
                    partJavascripts.push( item );
                } else {
                    partPages.push( item );
                }
            }
        },

        init() {

            for(let item in partPages) {

                load(partPages[item], (data)=>{
                    document.body.insertAdjacentHTML( 'beforeend', data );
                });
            }

            //console.log('initFunctions', initFunctions.length, initFunctions);
            //console.log('partJavascripts', partJavascripts.length, partJavascripts);

            for(let js in partJavascripts) {
                load(partJavascripts[js], (data)=>{
                    window.eval( data );
                });
            }

            console.log('init.');
        }
    };
}();