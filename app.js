$(document).ready(function() {
  var items = {}, toChange = "";
  var map = L.map('mapitem').setView([35.15, 33.4], 9);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 9,
    maxZoom: 18,
    id: 'mapbox.emerald',
    accessToken: 'pk.eyJ1IjoiY2hyaXN0b3NuYyIsImEiOiJjajl1bHA3dDc3NnBjMzJzNDR0MzEydmMxIn0.LMwreudCC2sgOVcFxZQkgw'
  }).addTo(map);

  // map.setMaxBounds(L.latLngBounds(L.latLng(34.5, 32), L.latLng(35.75, 34.7)));

  var layerGroup = L.layerGroup().addTo(map);

  var pv_icon = L.icon({
    iconUrl: 'Assets/p1.png',
    shadowUrl: 'Assets/p2.png',
    iconSize: [36, 42],
    shadowSize: [46, 40],
    iconAnchor: [17, 42],
    shadowAnchor: [2, 36],
    popupAnchor: [-3, -76]
  });

  map.addEventListener("click", function(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: pv_icon}).addTo(layerGroup);
    marker.on("click", popupOpen);
    toChange = "new";
    popupOpen(e.latlng.lat, e.latlng.lng);
  });

  function popupOpen(lat, lng) {
    var background = document.createElement("div");
    background.className = "popup-background";
    background.addEventListener("click", popupClose);
    document.body.appendChild(background);
    var popup = document.querySelector(".popup");

    if(toChange === "new"){
      document.getElementById("longitude").value = lng;
      document.getElementById("latitude").value = lat;
      document.querySelector(".button-delete").style.display = "none";
      popup.style.display = "block";
      return false;
    }

    for(var i = 0; i < items.length; i++){
      if(items[i].id === this.options.id){
        document.getElementById("name").value = items[i].name;
        document.getElementById("image-viewer").setAttribute("src", items[i].photo);
        document.getElementById("address").value = items[i].address;
        document.getElementById("longitude").value = items[i].longitude;
        document.getElementById("latitude").value = items[i].latitude;
        document.getElementById("operator").value = items[i].operator;
        document.getElementById("commision_date").value = items[i].commision_date;
        document.getElementById("description").value = items[i].description;
        document.getElementById("power").value = items[i].power;
        document.getElementById("production").value = items[i].production;
        document.getElementById("avoided").value = items[i].avoided;
        document.getElementById("reimbursement").value = items[i].reimbursement;
        document.getElementById("modules").value = items[i].modules;
        document.getElementById("azimuth").value = items[i].azimuth;
        document.getElementById("inclination").value = items[i].inclination;
        document.getElementById("inverter").value = items[i].inverter;
        document.getElementById("communication").value = items[i].communication;
        break;
      }
    }

    toChange = this.options.id;
    document.querySelector(".button-delete").style.display = "block";
    popup.style.display = "block";
    return false;
  }

  function popupClose() {
    document.getElementById("name").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("image-viewer").setAttribute("src", "");
    document.getElementById("address").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("operator").value = "";
    document.getElementById("commision_date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("power").value = "";
    document.getElementById("production").value = "";
    document.getElementById("avoided").value = "";
    document.getElementById("reimbursement").value = "";
    document.getElementById("modules").value = "";
    document.getElementById("azimuth").value = "";
    document.getElementById("inclination").value = "";
    document.getElementById("inverter").value = "";
    document.getElementById("communication").value = "";

    getAll();
    document.querySelector(".popup").style.display = "none";
    document.body.removeChild(document.querySelector(".popup-background"));
  }

  document.querySelector(".tab-title-general").addEventListener("click", function(e) {
    document.querySelector(".tab-general").style.display = "block";
    document.querySelector(".tab-efficiency").style.display = "none";
    document.querySelector(".tab-hardware").style.display = "none";
    document.querySelector(".tab-title-general").style.backgroundColor = "#0055ff";
    document.querySelector(".tab-title-efficiency").style.backgroundColor = "#464646";
    document.querySelector(".tab-title-hardware").style.backgroundColor = "#464646";
  });

  document.querySelector(".tab-title-efficiency").addEventListener("click", function(e) {
    document.querySelector(".tab-general").style.display = "none";
    document.querySelector(".tab-efficiency").style.display = "block";
    document.querySelector(".tab-hardware").style.display = "none";
    document.querySelector(".tab-title-general").style.backgroundColor = "#464646";
    document.querySelector(".tab-title-efficiency").style.backgroundColor = "#0055ff";
    document.querySelector(".tab-title-hardware").style.backgroundColor = "#464646";
  });

  document.querySelector(".tab-title-hardware").addEventListener("click", function(e) {
    document.querySelector(".tab-general").style.display = "none";
    document.querySelector(".tab-efficiency").style.display = "none";
    document.querySelector(".tab-hardware").style.display = "block";
    document.querySelector(".tab-title-general").style.backgroundColor = "#464646";
    document.querySelector(".tab-title-efficiency").style.backgroundColor = "#464646";
    document.querySelector(".tab-title-hardware").style.backgroundColor = "#0055ff";
  });

  document.querySelector(".button-cancel").addEventListener("click", popupClose);

  document.querySelector(".button-apply").addEventListener("click", addUpdate);

  document.querySelector(".button-delete").addEventListener("click", deletePV);

  document.getElementById("photo").addEventListener("change", openImage);

  document.querySelector(".image-delete").addEventListener("click", function(e){
    document.querySelector(".image-viewer").setAttribute("src", "");
  });

  function openImage(e) {
    if(this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.querySelector(".image-viewer").setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  }

  function getAll(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./API/getall.php", true);
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
        if(this.status == 200) {
          //Success -> this.response
          items = xhttp.response;
          toChange = "";
          layerGroup.clearLayers();
          for(var i = 0; i < xhttp.response.length; i++){
            var marker = L.marker([xhttp.response[i].latitude, xhttp.response[i].longitude], {icon: pv_icon, id: xhttp.response[i].id}).addTo(layerGroup);
            marker.on("click", popupOpen);
          }
        } else {
          //Error
        }
      }
    };
    xhttp.send();
  }

  function addUpdate(e) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./API/add.php", true);
    // xhttp.setRequestHeader("Authorization", id_token);
    // xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
        if(this.status == 200) {
          //Success -> this.response
          console.log(xhttp.response);
        } else {
          //Error
        }
        popupClose();
      }
    };

    var data = new FormData();
    if(toChange !== "new") data.append('id', toChange);
    else data.append('id', '');
    if(document.getElementById("name").value !== "") data.append('name', document.getElementById("name").value);
    if(document.getElementById("image-viewer").src !== "") data.append('photo', document.getElementById("image-viewer").src);
    if(document.getElementById("address").value !== "") data.append('address', document.getElementById("address").value);
    if(document.getElementById("longitude").value !== "") data.append('longitude', document.getElementById("longitude").value);
    if(document.getElementById("latitude").value !== "") data.append('latitude', document.getElementById("latitude").value);
    if(document.getElementById("operator").value !== "") data.append('operator', document.getElementById("operator").value);
    if(document.getElementById("commision_date").value !== "") data.append('commision_date', document.getElementById("commision_date").value);
    if(document.getElementById("description").value !== "") data.append('description', document.getElementById("description").value);
    if(document.getElementById("power").value !== "") data.append('power', document.getElementById("power").value);
    if(document.getElementById("production").value !== "") data.append('production', document.getElementById("production").value);
    if(document.getElementById("avoided").value !== "") data.append('avoided', document.getElementById("avoided").value);
    if(document.getElementById("reimbursement").value !== "") data.append('reimbursement', document.getElementById("reimbursement").value);
    if(document.getElementById("modules").value !== "") data.append('modules', document.getElementById("modules").value);
    if(document.getElementById("azimuth").value !== "") data.append('azimuth', document.getElementById("azimuth").value);
    if(document.getElementById("inclination").value !== "") data.append('inclination', document.getElementById("inclination").value);
    if(document.getElementById("inverter").value !== "") data.append('inverter', document.getElementById("inverter").value);
    if(document.getElementById("communication").value !== "") data.append('communication', document.getElementById("communication").value);

    xhttp.send(data);
  }

  function deletePV(){
    if(toChange === "new"){
      popupClose();
      return false;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./API/delete.php", true);
    // xhttp.setRequestHeader("Authorization", id_token);
    // xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
        if(this.status == 200) {
          //Success -> this.response
          console.log(xhttp.response);
        } else {
          //Error
        }
        popupClose();
      }
    };

    var data = new FormData();
    data.append('id', toChange);
    xhttp.send(data);
  }

  getAll();
});