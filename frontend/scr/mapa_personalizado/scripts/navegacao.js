// --- VARIÁVEIS DE CONTROLE ---
var userMarker = null;      // Marcador do usuário
var posicaoUsuario = null;  // {lat, lng} atual
var posicaoDestino = null;  // {lat, lng} do destino
var ultimaPosicaoCalc = null; // Para evitar recalcular a cada passo mínimo

// --- CONFIGURAÇÕES VISUAIS (GEOJSON) --- 
var caminhosCampus = {
    "type": "FeatureCollection",
    "name": "campus_universidade",
    "features": [
        { "type": "Feature", "properties": { "id": 2, "penalty": 1.0, "tipo_via": "calcada", "layer": "calcadas_unipe", "path": "../caminhos_unipe.geojson" }, "geometry": { "type": "MultiLineString", "coordinates": [ ] } },
    ]
};

// --- ÍCONE DO USUÁRIO ---
var iconGPS = L.divIcon({
    className: 'css-icon',
    html: '<div class="gps-ring"></div><div class="gps-marker" style="width:10px;height:10px;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// --- CHAMADA DA API JAVA ---
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

            // Redesenha o marcador de destino
            if (pontoB) {
                L.marker(pontoB).addTo(camadaRota).bindPopup("Destino");
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

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function(pos){
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            posicaoUsuario = L.latLng(lat, lng);

            // Cria ou atualiza o ícone do usuário no mapa
            if (!userMarker) {
                userMarker = L.marker(posicaoUsuario, {icon: iconGPS, zIndexOffset: 1000}).addTo(map);
                map.setView(posicaoUsuario, 18);
            } else {
                userMarker.setLatLng(posicaoUsuario);
            }

            // Se já existe um destino, atualiza a rota automaticamente
            if (posicaoDestino) {
                // Calcula distância percorrida desde o último cálculo para não spammar a API
                var dist = 0;
                if (ultimaPosicaoCalc) {
                    dist = posicaoUsuario.distanceTo(ultimaPosicaoCalc);
                }

                // Só recalcula se andou mais de 5 metros
                if (!ultimaPosicaoCalc || dist > 5) {
                    calcularRota(posicaoUsuario, posicaoDestino);
                    ultimaPosicaoCalc = posicaoUsuario;
                }
            }
        },
        function(err) {
            console.error("Erro GPS:", err);
        },
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );
}
else {
    alert("Seu navegador não suporta GPS.");
}

// --- INTERAÇÃO COM USUÁRIO ---
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

