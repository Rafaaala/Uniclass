// --- 1. DADOS E CONFIGURAÇÕES ---
var limitesDoCampus = L.latLngBounds(
    [-7.16353530137493, -34.85958937363623], // Canto Inferior Esquerdo
    [-7.155443330743842, -34.84868800422955]  // Canto Superior Direito
);

// GeoJSON dos caminhos
var caminhosCampus = {
    "type": "FeatureCollection",
    "name": "campus_universidade",
    "features": [
        // ... SEU CONTEÚDO GEOJSON GIGANTE AQUI ...
        // Cole aqui todo o conteúdo que estava dentro de "features": [...]
        { "type": "Feature", "properties": { "id": 2, "penalty": 1.0, "tipo_via": "calcada", "layer": "calcadas_unipe", "path": "C:\\Users\\ACER\\Desktop\\mapa_unipe\\calcadas_unipe.shp" }, "geometry": { "type": "MultiLineString", "coordinates": [ ] } },
        // ... etc ...
    ]
};

// --- 2. INICIALIZAÇÃO DO MAPA ---
var map = L.map('map', {
    center: [-7.159, -34.855],
    zoom: 18,
    minZoom: 17,
    maxZoom: 19,
    maxBounds: limitesDoCampus, 
    maxBoundsViscosity: 1.0
});

// Adiciona imagem base do mapa (Tiles locais)
L.tileLayer('tiles/png/{z}/{x}/{y}.png', {
    minZoom: 17,
    maxZoom: 19,
    tms: false,
    attribution: 'Mapa UNIPE'
}).addTo(map);

// Adiciona os caminhos visuais ao mapa
// L.geoJSON(caminhosCampus, {
//     style: function(feature) {
//         return { color: "#f5f542", weight: 1, dashArray: '5, 5' }; // Estilo visual das ruas
//     }
// }).addTo(map);


// --- 3. LÓGICA DE ROTEAMENTO (GraphHopper) ---

var camadaRota = L.layerGroup().addTo(map);
var pontos = [];

function calcularRota(pontoA, pontoB) {
    // URL da API local do GraphHopper
    var url = `http://localhost:8989/route?point=${pontoA.lat},${pontoA.lng}&point=${pontoB.lat},${pontoB.lng}&profile=foot&points_encoded=false`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Limpa rota anterior
            camadaRota.clearLayers();

            if (!data.paths || data.paths.length === 0) {
                console.error("Nenhuma rota encontrada.");
                return;
            }

            // Pega o caminho dos pontos da resposta
            var caminho = data.paths[0].points.coordinates;
            
            // Inverte [lng, lat] para [lat, lng] que o Leaflet usa
            var latlngs = caminho.map(coord => [coord[1], coord[0]]);

            // Desenha a linha azul da rota
            L.polyline(latlngs, {color: 'blue', weight: 4}).addTo(camadaRota);
            
            // Log de distância
            var distancia = data.paths[0].distance;
            console.log(`Distância: ${distancia} metros`);
        })
        .catch(err => console.error("Erro ao conectar com GraphHopper:", err));
}

// --- 4. INTERAÇÃO DO USUÁRIO ---
map.on('click', function(e) {
    pontos.push(e.latlng);

    // Adiciona marcador onde clicou
    L.marker(e.latlng).addTo(camadaRota);

    if (pontos.length === 2) {
        // Se já temos 2 pontos, traça a rota e reseta o array
        calcularRota(pontos[0], pontos[1]);
        pontos = []; 
    }
});