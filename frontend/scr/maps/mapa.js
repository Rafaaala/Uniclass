/* ==========================
   FUNÇÃO JAVASCRIPT PARA O MENU LATERAL (Controle)
   ========================== */
function toggleMenu() {
    var menu = document.getElementById("menuLateral");
    var overlay = document.querySelector(".overlay");
    
    if (menu.classList.contains('aberto')) {
        // Fechar
        menu.classList.remove('aberto');
        overlay.classList.remove('ativo');
    } else {
        // Abrir
        menu.classList.add('aberto');
        overlay.classList.add('ativo');
    }
}


/* ==========================
   CONFIGURAÇÕES INICIAIS
   ========================== */
var bounds = [[-7.1623, -34.8587], [-7.1559, -34.8501]];

var map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    minZoom: 17,
    maxZoom: 22,
    zoomControl: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 22
}).addTo(map);

/* ==========================
   POLÍGONO EXTERNO (SEM BORDA)
   ========================== */
var unipeCoords = [
    [-7.1588302, -34.8585758],
    [-7.1597132, -34.8570868],
    [-7.1622659, -34.8531979],
    [-7.1614052, -34.8527402],
    [-7.161001, -34.8525253],
    [-7.1605284, -34.8522832],
    [-7.1601329, -34.8520806],
    [-7.1565786, -34.8502601],
    [-7.1560631, -34.8523748],
    [-7.1560278, -34.8525193],
    [-7.1569194, -34.8527581],
    [-7.1567996, -34.8531577],
    [-7.1565548, -34.8530933],
    [-7.1563844, -34.8537022],
    [-7.1566692, -34.853788],
    [-7.1564776, -34.8543727],
    [-7.1561795, -34.8543084],
    [-7.1561369, -34.8544747],
    [-7.1575155, -34.8546436],
    [-7.1573026, -34.856324],
    [-7.1571136, -34.8575243],
    [-7.1588302, -34.8585758]
];

var poligonoExterno = L.polygon(unipeCoords, {
    color: 'transparent',
    weight: 0,
    opacity: 0,
    fillOpacity: 0
}).addTo(map);

map.fitBounds(poligonoExterno.getBounds(), { padding: [0,0] });

/* ==========================
   BLOCOS (invisíveis, clicáveis)
   ========================== */
var blocos = [
    {nome: "CT - Complexo de Tecnologia", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1592, -34.8567], [-7.1592, -34.8560], [-7.1600, -34.8560], [-7.1600, -34.8567]]},

    {nome: "Bloco G", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1576, -34.8548], [-7.1576, -34.8541], [-7.1583, -34.8541], [-7.1583, -34.8548]]},

    {nome: "Quadra Amarela", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1588, -34.8560], [-7.1588, -34.8550], [-7.1595, -34.8550], [-7.1595, -34.8560]]},

    {nome: "Bloco C", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1589, -34.8548], [-7.1589, -34.8541], [-7.1596, -34.8541], [-7.1596, -34.8548]]},

    {nome: "Bloco H", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1576, -34.8558], [-7.1576, -34.8551], [-7.1583, -34.8551], [-7.1583, -34.8558]]},

    {nome: "Bloco I", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1574, -34.8559], [-7.1574, -34.8552], [-7.1581, -34.8552], [-7.1581, -34.8559]]},

    {nome: "Bloco J", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1586, -34.8561], [-7.1586, -34.8554], [-7.1593, -34.8554], [-7.1593, -34.8561]]},

    {nome: "Bloco de Medicina", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1586, -34.8524], [-7.1586, -34.8517], [-7.1593, -34.8517], [-7.1593, -34.8524]]},

    {nome: "Auditório", tipo: "instalacao", horario: "06:00 - 22:00",
      coords: [[-7.1583, -34.8528], [-7.1583, -34.8521], [-7.1590, -34.8521], [-7.1590, -34.8528]]},

    {nome: "Bloco de Enfermagem", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1605, -34.8545], [-7.1605, -34.8538], [-7.1612, -34.8538], [-7.1612, -34.8545]]},

    {nome: "Bloco B", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1592, -34.8551], [-7.1592, -34.8545], [-7.1599, -34.8545], [-7.1599, -34.8551]]},

    {nome: "Bloco A", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1593, -34.8547], [-7.1593, -34.8540], [-7.1600, -34.8540], [-7.1600, -34.8547]]},

    {nome: "Bloco F", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1579, -34.8547], [-7.1579, -34.8540], [-7.1586, -34.8540], [-7.1586, -34.8547]]},

    {nome: "Bloco D", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1583, -34.8545], [-7.1583, -34.8538], [-7.1590, -34.8538], [-7.1590, -34.8545]]},

    {nome: "Bloco E", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1581, -34.8546], [-7.1581, -34.8539], [-7.1588, -34.8539], [-7.1588, -34.8546]]},

    {nome: "Bloco de Odontologia", tipo: "quadra", salas: "Em breve", horario: "07:00 - 22:00",
      coords: [[-7.1607, -34.8535], [-7.1607, -34.8528], [-7.1615, -34.8528], [-7.1615, -34.8535]]},

    {nome: "Ginásio UNIPÊ", tipo: "instalacao", horario: "06:00 - 22:00",
      coords: [[-7.1592, -34.8561], [-7.1592, -34.8553], [-7.1601, -34.8553], [-7.1601, -34.8561]]},

    {nome: "Biblioteca Central", tipo: "instalacao", horario: "07:00 - 21:00",
      coords: [[-7.1599, -34.8543], [-7.1599, -34.8536], [-7.1607, -34.8536], [-7.1607, -34.8543]]},

    {nome: "Reitoria", tipo: "instalacao", horario: "08:00 - 18:00",
      coords: [[-7.1590, -34.8530], [-7.1590, -34.8523], [-7.1598, -34.8523], [-7.1598, -34.8530]]},

    {nome: "EVA", tipo: "instalacao", horario: "07:00 - 22:00",
      coords: [[-7.1600, -34.8548], [-7.1600, -34.8541], [-7.1608, -34.8541], [-7.1608, -34.8548]]}
];

/* ==========================
   VARIÁVEIS DE ROTA E NAVEGAÇÃO
   ========================== */
var rotaAtual = null;
var rotaPolyline = null;
var rotaCoords = [];
var rotaInstrucoes = [];
var instrucaoAtual = 0;
var userMarker = null;
var userPos = null;
var lastPos = null;
var watchId = null;
var avisoEl = document.getElementById('aviso-fora');
var btnSairNavegacao = document.getElementById('btn-sair-navegacao');
var vozAtiva = true;
var destinoAtual = null; // {lat,lng,nome}
var autoReloadIntervalId = null;
var autoReloadEnabled = false;
const AUTO_RELOAD_MS = 12000;
var deviceAlpha = null; // orientação do dispositivo

/* ==========================
   FUNÇÕES UTILITÁRIAS
   ========================== */

function calculaBearing(lat1, lon1, lat2, lon2) {
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δλ = (lon2 - lon1) * Math.PI / 180;

    var y = Math.sin(Δλ) * Math.cos(φ2);
    var x = Math.cos(φ1)*Math.sin(φ2) -
             Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    var θ = Math.atan2(y, x);
    var bearing = (θ * 180 / Math.PI + 360) % 360;
    return bearing;
}

function falar(texto) {
    if (!vozAtiva) return;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
        console.log('🔊 Falando:', texto);
    }
}

function toggleVoz() {
    vozAtiva = !vozAtiva;
    var btn = document.getElementById('btn-toggle-voz');
    if (vozAtiva) {
        btn.classList.remove('desativado');
        btn.innerHTML = '🔊';
        falar('Navegação por voz ativada');
    } else {
        btn.classList.add('desativado');
        btn.innerHTML = '🔇';
        window.speechSynthesis.cancel();
    }
}

/* Tradução das instruções (mesma que tinha) */
function traduzirInstrucao(instrucao) {
    var texto = instrucao.text || '';
    var tipo = instrucao.type || '';
    var distancia = Math.round(instrucao.distance || 0);
    var traducoes = {
        'turn-right': 'Vire à direita',
        'turn-left': 'Vire à esquerda',
        'turn-sharp-right': 'Vire acentuadamente à direita',
        'turn-sharp-left': 'Vire acentuadamente à esquerda',
        'turn-slight-right': 'Vire levemente à direita',
        'turn-slight-left': 'Vire levemente à esquerda',
        'continue': 'Continue em frente',
        'straight': 'Siga em frente',
        'arrive': 'Você chegou ao seu destino',
        'depart': 'Siga pela rota'
    };
    var textoTraduzido = traducoes[tipo] || texto || 'Continue';
    if (distancia > 0 && tipo !== 'arrive') {
        if (distancia < 100) {
            textoTraduzido += ' em ' + distancia + ' metros';
        } else {
            textoTraduzido += ' em aproximadamente ' + Math.round(distancia / 100) * 100 + ' metros';
        }
    }
    return textoTraduzido;
}

function mostrarAvisoFora(show) {
    if (show) {
        avisoEl.style.display = 'block';
        setTimeout(function(){ avisoEl.style.display = 'none'; }, 5000);
    } else {
        avisoEl.style.display = 'none';
    }
}

/* ==========================
   CRIAÇÃO DOS POLÍGONOS INVISÍVEIS E POPUPS COM BOTÃO IR
   ========================== */
for (var i = 0; i < blocos.length; i++) {
    (function(bloco){
        var polygon = L.polygon(bloco.coords, {
            color: 'transparent',
            weight: 0,
            opacity: 0,
            fillColor: 'transparent',
            fillOpacity: 0
        }).addTo(map);

        var centro = polygon.getBounds().getCenter();

        // Salva um índice rápido de destinos (nome -> centro)
        bloco._centro = centro;

        var popupContent = `
            <div class="popup-header">${bloco.nome}</div>
            <div class="popup-body">
                ${bloco.tipo === 'quadra' ? `
                <div class="popup-section">
                    <div class="popup-label">Salas/Ambientes:</div>
                    <div class="popup-value popup-pending">${bloco.salas}</div>
                </div>` : ''}

                <div class="popup-section">
                    <div class="popup-label">Horário:</div>
                    <div class="popup-value">${bloco.horario}</div>
                </div>

                <button class="btn-ir" onclick="iniciarNavegacao(${centro.lat}, ${centro.lng}, '${bloco.nome.replace(/'/g,"\\'")}')">IR</button>
            </div>
        `;

        polygon.bindPopup(popupContent);
    })(blocos[i]);
}

/* ==========================
   ROTA / LRM
   ========================== */
function criarRoutingControl(waypoints) {
    if (rotaAtual) {
        try { map.removeControl(rotaAtual); } catch(e) { console.warn(e); }
        rotaAtual = null;
    }
    rotaAtual = L.Routing.control({
        waypoints: waypoints,
        lineOptions: {
            addWaypoints: false,
            draggableWaypoints: false,
            styles: [{ color: '#2563eb', opacity: 0.9, weight: 5 }]
        },
        router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1",
            profile: 'foot'
        }),
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: true
    }).addTo(map);

    rotaAtual.on('routesfound', function(e) {
        // pega coords e instruções (se houver)
        if (e.routes && e.routes[0] && e.routes[0].coordinates) {
            rotaCoords = e.routes[0].coordinates.map(function(coord){ return [coord.lat, coord.lng]; });
            if (e.routes[0].instructions) {
                rotaInstrucoes = e.routes[0].instructions;
                instrucaoAtual = 0;
            } else {
                rotaInstrucoes = [];
                instrucaoAtual = 0;
            }

            // cria polyline custom
            if (rotaPolyline) { try { map.removeLayer(rotaPolyline); } catch(e){} }
            rotaPolyline = L.polyline(rotaCoords, { color: '#2563eb', weight: 5, opacity: 0.9 }).addTo(map);

            // Anuncia resumo (se voz ativa)
            var resumo = e.routes[0].summary;
            if (resumo) {
                var distanciaTotal = Math.round(resumo.totalDistance || 0);
                var tempoTotal = Math.round((resumo.totalTime || 0) / 60);
                falar('Rota atualizada. Distância ' + distanciaTotal + ' metros. Tempo ' + tempoTotal + ' minutos.');
            }
        }

        // Esconde painel padrão
        var routeContainer = document.querySelector('.leaflet-routing-container');
        if (routeContainer) routeContainer.style.display = 'none';
    });
}

/* ==========================
   INICIAR NAVEGAÇÃO (usa userPos)
   ========================== */
function iniciarNavegacao(destLat, destLng, nomeBloco) {
    if (!userPos) {
        alert("Aguardando permissão de localização. Por favor permita o acesso ao GPS e tente novamente.");
        return;
    }
    var latlngUser = L.latLng(userPos.lat, userPos.lng);
    var latlngDest = L.latLng(destLat, destLng);

    // Verifica se está dentro do polígono do campus
    if (!poligonoExterno.getBounds().contains(latlngUser)) {
        mostrarAvisoFora(true);
        return;
    }

    // guarda destino
    destinoAtual = { lat: destLat, lng: destLng, nome: nomeBloco };

    // cria/controla rota
    criarRoutingControl([ L.latLng(userPos.lat, userPos.lng), L.latLng(destLat, destLng) ]);

    // mostra controles úteis
    document.getElementById('btn-auto-reload').style.display = 'block';
    document.getElementById('btn-proxima').style.display = 'block';
    document.getElementById('btn-anterior').style.display = 'block';
}

/* Recarrega a rota atual (sem reload de página) */
function recarregarRota() {
    if (!destinoAtual) {
        alert('Nenhuma rota ativa para recarregar.');
        return;
    }
    if (!userPos) {
        alert('Aguardando posição do GPS. Por favor espere e tente novamente.');
        return;
    }

    // Força novo controle com pontos atualizados
    criarRoutingControl([ L.latLng(userPos.lat, userPos.lng), L.latLng(destinoAtual.lat, destinoAtual.lng) ]);
    console.log('Rota recarregada manualmente para', destinoAtual.nome);
}

/* Toggle Auto Reload */
function toggleAutoReload() {
    var btn = document.getElementById('btn-auto-reload');
    autoReloadEnabled = !autoReloadEnabled;
    if (autoReloadEnabled) {
        btn.classList.add('active');
        btn.innerText = 'Auto-reload: ligado';
        if (autoReloadIntervalId) clearInterval(autoReloadIntervalId);
        // Recarrega imediatamente e depois a cada intervalo
        recarregarRota();
        autoReloadIntervalId = setInterval(function(){
            // recarrega só se houver destino e se o usuário se afastou da rota (opcional)
            if (destinoAtual) recarregarRota();
        }, AUTO_RELOAD_MS);
    } else {
        btn.classList.remove('active');
        btn.innerText = 'Auto-reload';
        if (autoReloadIntervalId) { clearInterval(autoReloadIntervalId); autoReloadIntervalId = null; }
    }
}

/* ==========================
   GERENCIAMENTO DA SETA (MARKER ROTACIONÁVEL / BÚSSOLA)
   ========================== */
function criarUserMarker(lat, lng) {
    if (userMarker) {
        userMarker.setLatLng([lat, lng]);
        return;
    }
    var divIcon = L.divIcon({
        className: 'arrow-icon',
        html: '<div class="arrow" style="transform: rotate(0deg)"></div>',
        iconSize: [44,44],
        iconAnchor: [22, 22]
    });
    userMarker = L.marker([lat, lng], { icon: divIcon, interactive: false }).addTo(map);
}

function atualizarUserMarker(lat, lng, heading) {
    if (!userMarker) criarUserMarker(lat, lng);
    else userMarker.setLatLng([lat, lng]);

    var el = userMarker.getElement();
    if (el) {
        var arrowEl = el.querySelector('.arrow');
        if (arrowEl) {
            // usa deviceAlpha preferencialmente, se disponível usa orientação absoluta
            var finalHeading = heading;
            if (deviceAlpha !== null && !isNaN(deviceAlpha)) {
                finalHeading = deviceAlpha;
            }
            var adjusted = (finalHeading + 360) % 360;
            arrowEl.style.transform = 'rotate(' + adjusted + 'deg)';
        }
    }
}

/* ==========================
   ATUALIZA ROTA PERCORRIDA e ANUNCIOS
   ========================== */
function atualizarRotaPercorrida(lat, lng) {
    if (!rotaPolyline || rotaCoords.length === 0) return;
    var userLatLng = L.latLng(lat, lng);
    var distanciaMinima = 20;
    var menorDistancia = Infinity;
    var indiceMaisProximo = -1;

    for (var i = 0; i < rotaCoords.length; i++) {
        var pontoRota = L.latLng(rotaCoords[i][0], rotaCoords[i][1]);
        var distancia = userLatLng.distanceTo(pontoRota);
        if (distancia < menorDistancia) { menorDistancia = distancia; indiceMaisProximo = i; }
    }

    if (indiceMaisProximo > 0 && menorDistancia < distanciaMinima) {
        var novosCoords = rotaCoords.slice(indiceMaisProximo);
        if (novosCoords.length > 0 && novosCoords.length < rotaCoords.length) {
            rotaCoords = novosCoords;
            rotaPolyline.setLatLngs(rotaCoords);
            console.log('Rota atualizada! Pontos restantes:', rotaCoords.length);
        }
    }

    // Anúncios de instrução
    if (rotaInstrucoes && instrucaoAtual < rotaInstrucoes.length) {
        var instrucao = rotaInstrucoes[instrucaoAtual];
        if (instrucao.index !== undefined && rotaCoords.length > 0) {
            var idx = Math.min(instrucao.index, rotaCoords.length - 1);
            var pontoInstrucao = L.latLng(rotaCoords[idx][0], rotaCoords[idx][1]);
            var distanciaInstrucao = userLatLng.distanceTo(pontoInstrucao);
            if (distanciaInstrucao < 30) {
                var textoInstrucao = traduzirInstrucao(instrucao);
                falar(textoInstrucao);
                instrucaoAtual++;
                console.log('📍 Instrução anunciada:', textoInstrucao);
            }
        }
    }

    // Chegou ao destino?
    if (rotaCoords.length > 0) {
        var ultimoPonto = L.latLng(rotaCoords[rotaCoords.length - 1][0], rotaCoords[rotaCoords.length - 1][1]);
        var distanciaFinal = userLatLng.distanceTo(ultimoPonto);
        if (distanciaFinal < 10) {
            if (rotaPolyline) { map.removeLayer(rotaPolyline); rotaPolyline = null; }
            if (rotaAtual) { map.removeControl(rotaAtual); rotaAtual = null; }
            rotaCoords = [];
            rotaInstrucoes = [];
            instrucaoAtual = 0;
            falar('Você chegou ao seu destino!');
            btnSairNavegacao.style.display = 'block';
            L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
                .setLatLng(ultimoPonto)
                .setContent('<strong>🎉 Você chegou ao destino!</strong><br/><small>Pressione o botão abaixo para encerrar</small>')
                .openOn(map);
            console.log('Destino alcançado!');
        }
    }
}

/* ==========================
   WATCHPOSITION (GPS em tempo real)
   ========================== */
function iniciarWatchPosition() {
    if (!('geolocation' in navigator)) {
        alert('Geolocalização não suportada pelo navegador.');
        return;
    }
    if (watchId !== null) return;

    watchId = navigator.geolocation.watchPosition(function(pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        lastPos = userPos ? {lat: userPos.lat, lng: userPos.lng} : null;
        userPos = {lat: lat, lng: lng};

        criarUserMarker(lat, lng);

        // calcula heading
        var heading = null;
        if (pos.coords.heading !== null && !isNaN(pos.coords.heading)) heading = pos.coords.heading;
        if ((heading === null || isNaN(heading)) && lastPos) heading = calculaBearing(lastPos.lat, lastPos.lng, lat, lng);
        if (heading === null || isNaN(heading)) heading = 0;

        atualizarUserMarker(lat, lng, heading);

        // remove trechos percorridos e anuncia instruções
        atualizarRotaPercorrida(lat, lng);

        // aviso fora do campus
        if (!poligonoExterno.getBounds().contains(L.latLng(lat,lng))) {
            mostrarAvisoFora(true);
        } else {
            mostrarAvisoFora(false);
        }
    }, function(err) {
        console.warn('Geolocation error:', err);
        if (err.code === 1) alert('Permissão de localização negada. Para usar a navegação, permita acesso ao GPS.');
        else alert('Erro ao obter localização: ' + err.message);
    }, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000
    });
}

/* ==========================
   ORIENTAÇÃO DO DISPOSITIVO (BÚSSOLA)
   ========================== */
function iniciarDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(function(response) {
                if (response === 'granted') {
                    window.addEventListener('deviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation', function(e) {
                        if (e.alpha !== null) deviceAlpha = e.alpha;
                    }, true);
                }
            })
            .catch(function(err){
                console.warn('deviceorientation permission:', err);
            });
    } else if ('ondeviceorientationabsolute' in window || 'ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', function(e){
            if (e.alpha !== null) deviceAlpha = e.alpha;
        }, true);
    }
}

/* ==========================
   SAIR DA NAVEGAÇÃO
   ========================== */
function sairDaNavegacao() {
    if (rotaPolyline) { map.removeLayer(rotaPolyline); rotaPolyline = null; }
    if (rotaAtual) { map.removeControl(rotaAtual); rotaAtual = null; }
    rotaCoords = [];
    rotaInstrucoes = [];
    instrucaoAtual = 0;
    destinoAtual = null;

    // Cancela auto reload
    if (autoReloadIntervalId) { clearInterval(autoReloadIntervalId); autoReloadIntervalId = null; autoReloadEnabled = false; document.getElementById('btn-auto-reload').classList.remove('active'); document.getElementById('btn-auto-reload').style.display = 'none'; }
    btnSairNavegacao.style.display = 'none';
    document.getElementById('btn-proxima').style.display = 'none';
    document.getElementById('btn-anterior').style.display = 'none';
    map.closePopup();

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    L.popup({ closeButton: true, autoClose: true, closeOnClick: true })
        .setLatLng(userPos ? [userPos.lat, userPos.lng] : map.getCenter())
        .setContent('<strong>Navegação encerrada</strong>')
        .openOn(map);
}

/* ==========================
   CLIQUE NO MAPA: definir destino e mostrar popup "Ir aqui"
   ========================== */
map.on('click', function(e) {
    var latlng = e.latlng;
    var content = `<div style="font-size:14px">Navegar até aqui?<br/><button class="btn-ir" onclick="iniciarNavegacao(${latlng.lat}, ${latlng.lng}, 'Local selecionado')">IR AQUI</button></div>`;
    L.popup({ closeButton: true })
        .setLatLng(latlng)
        .setContent(content)
        .openOn(map);
});

/* ==========================
   FUNÇÕES DE INSTRUÇÃO (próxima / anterior)
   ========================== */
function anunciarProximaInstrucao() {
    if (!rotaInstrucoes || instrucaoAtual >= rotaInstrucoes.length) {
        falar('Sem próximas instruções.');
        return;
    }
    var instrucao = rotaInstrucoes[instrucaoAtual];
    var texto = traduzirInstrucao(instrucao);
    falar(texto);
    instrucaoAtual++;
}

function anunciarInstrucaoAnterior() {
    if (!rotaInstrucoes || instrucaoAtual <= 0) {
        falar('Não há instruções anteriores.');
        return;
    }
    instrucaoAtual = Math.max(0, instrucaoAtual - 1);
    var instrucao = rotaInstrucoes[instrucaoAtual];
    var texto = traduzirInstrucao(instrucao);
    falar(texto);
}

/* ==========================
   MAPEAMENTO DE NOMES (para comando "leve-me até X")
   ========================== */
var mapaDestinos = {};
for (var i = 0; i < blocos.length; i++) {
    var nome = blocos[i].nome.toLowerCase();
    mapaDestinos[nome] = { lat: blocos[i]._centro.lat, lng: blocos[i]._centro.lng, nome: blocos[i].nome };
}

/* ==========================
   RECONHECIMENTO DE VOZ (comandos)
   ========================== */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = null;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = function(event) {
        var comando = event.results[0][0].transcript.toLowerCase().trim();
        console.log('Comando reconhecido:', comando);
        interpretarComandoVoz(comando);
    };
    recognition.onerror = function(e) {
        console.warn('Erro reconhecimento:', e);
    };
    recognition.onend = function() {
        // não reiniciamos automaticamente para evitar loops; o usuário clica novamente
    };
} else {
    console.warn('SpeechRecognition não disponível neste navegador.');
}

/* botão para iniciar reconhecimento */
var btnVoiceCmd = document.getElementById('btn-voice-cmd');
btnVoiceCmd.addEventListener('click', function() {
    if (!recognition) { alert('Reconhecimento de voz não suportado neste navegador.'); return; }
    try {
        recognition.start();
        btnVoiceCmd.innerText = '🔴';
        setTimeout(function(){ btnVoiceCmd.innerText = '🎤'; }, 3000);
    } catch(e) { console.warn(e); }
});

/* Interpretação dos comandos de voz */
function interpretarComandoVoz(comando) {
    // comandos simples
    if (comando.includes('iniciar rota') || comando.includes('começar rota')) {
        if (destinoAtual) {
            iniciarNavegacao(destinoAtual.lat, destinoAtual.lng, destinoAtual.nome);
        } else {
            falar('Nenhum destino selecionado. Toque em um bloco ou no mapa para escolher um destino.');
        }
        return;
    }
    if (comando.includes('parar rota') || comando.includes('encerrar rota') || comando.includes('parar navegação')) {
        sairDaNavegacao();
        return;
    }
    if (comando.includes('recarregar rota') || comando.includes('atualizar rota')) {
        recarregarRota();
        return;
    }
    if (comando.includes('próxima instrução') || comando.includes('próxima')) {
        anunciarProximaInstrucao();
        return;
    }
    if (comando.includes('instrução anterior') || comando.includes('anterior')) {
        anunciarInstrucaoAnterior();
        return;
    }
    if (comando.includes('ativar auto') || comando.includes('ligar auto')) {
        if (!autoReloadEnabled) toggleAutoReload();
        falar('Auto-recarregamento ativado');
        return;
    }
    if (comando.includes('desativar auto') || comando.includes('desligar auto')) {
        if (autoReloadEnabled) toggleAutoReload();
        falar('Auto-recarregamento desativado');
        return;
    }
    if (comando.includes('ativar voz')) {
        vozAtiva = true; toggleVoz();
        return;
    }
    if (comando.includes('desativar voz')) {
        vozAtiva = false; toggleVoz();
        return;
    }

    // "Leve-me até X" -> tenta casar com nomes dos blocos
    if (comando.startsWith('leve-me até') || comando.startsWith('leve me até') || comando.startsWith('vá para') || comando.startsWith('ir para')) {
        // extrai a parte depois do verbo
        var partes = comando.replace('leve-me até','').replace('leve me até','').replace('vá para','').replace('ir para','').trim();
        if (partes.length === 0) {
            falar('Qual destino? Diga, por exemplo, leve-me até Biblioteca Central.');
            return;
        }
        // tentativa de combinação direta e aproximada
        var chave = partes.toLowerCase();
        // tenta match exato
        if (mapaDestinos[chave]) {
            var dest = mapaDestinos[chave];
            iniciarNavegacao(dest.lat, dest.lng, dest.nome);
            return;
        }
        // tenta busca por substring dentro dos nomes
        var found = null;
        for (var k in mapaDestinos) {
            if (k.indexOf(chave) !== -1) { found = mapaDestinos[k]; break; }
        }
        if (found) {
            iniciarNavegacao(found.lat, found.lng, found.nome);
            return;
        }
        // se não encontrou
        falar('Não achei o destino pedido: ' + partes + '. Tente dizer um nome dos blocos, por exemplo Biblioteca Central.');
        return;
    }

    // fallback: não reconhecido
    falar('Comando não reconhecido. Tente: iniciar rota, parar rota, recarregar rota, leve-me até Biblioteca Central, próxima instrução.');
}

/* ==========================
   INICIA WATCH E ORIENTAÇÃO AO CARREGAR
   ========================== */
iniciarWatchPosition();
iniciarDeviceOrientation();

/* Exibe/oculta botões quando unload */
window.addEventListener('beforeunload', function(){
    if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }
    if (autoReloadIntervalId) clearInterval(autoReloadIntervalId);
});

/* ==========================
   BOTÕES UI: AutoReload
   ========================== */
document.getElementById('btn-auto-reload').addEventListener('click', toggleAutoReload);