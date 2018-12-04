<?php
    require_once("API/authentication.php");
?>

<html>
<head>
    <link rel="stylesheet" href="leaflet/leaflet.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="leaflet/leaflet.js"></script>
    <script src="JQuery/jquery-3.3.1-min.js"></script>
    <script src="app.js"></script>
</head>
<body>
    <div class="map" id="mapitem"></div>
    <div class="popup">
        <div class="tab-titles">
            <div class="tab-title tab-title-general">General</div>
            <div class="tab-title tab-title-efficiency">Efficiency</div>
            <div class="tab-title tab-title-hardware">Hardware</div>
        </div>
        <div class="tab tab-general">
            <div class="input-wrapper">
                <div class="input-label">Name:</div>
                <input id="name" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Photo:</div>
                <input type="file" accept="image/*" id="photo" class="input-input">
                <img id="image-viewer" class="image-viewer">
                <div class="button image-delete">Remove</div>
            </div>
            <div class="input-wrapper">
                <div class="input-label">Address:</div>
                <input id="address" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Longitude:</div>
                <input type="number" id="longitude" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Latitude:</div>
                <input type="number" id="latitude" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Operator:</div>
                <input id="operator" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Commision date:</div>
                <input type="date" id="commision_date" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Description:</div>
                <input id="description" class="input-input">
            </div>
        </div>
        <div class="tab tab-efficiency">
            <div class="input-wrapper">
                <div class="input-label">System power (KWp):</div>
                <input type="number" id="power" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Annual production (KWh):</div>
                <input type="number" id="production" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Avoided (Tons/y):</div>
                <input type="number" id="avoided" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Reimbursement (€):</div>
                <input type="number" id="reimbursement" class="input-input">
            </div>
        </div>
        <div class="tab tab-hardware">
            <div class="input-wrapper">
                <div class="input-label">Solar panel modules:</div>
                <input type="number" id="modules" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Azimuth angle:</div>
                <input type="number" id="azimuth" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Inclination angle:</div>
                <input type="number" id="inclination" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Communication:</div>
                <input id="communication" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Inverter:</div>
                <input id="inverter" class="input-input">
            </div>
            <div class="input-wrapper">
                <div class="input-label">Sensors:</div>
                <input id="sensors" class="input-input">
            </div>
        </div>
        <div class="button-wrapper">
            <div class="button button-cancel">Cancel</div>
            <div class="button button-apply">Apply</div>
            <div class="button button-delete">Delete</div>
        </div>
    </div>
</body>
</html>