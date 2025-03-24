
// Initial disaster data
const disasterData = [];
let controlCenter = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi, India

// Initialize Leaflet Map
const map = L.map('map').setView([controlCenter.lat, controlCenter.lng], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Handle Control Center Form Submission
document.getElementById("control-center-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const controlLocation = document.getElementById("controlLocation").value;

    // Get coordinates for control center location
    const coordinates = await getCoordinates(controlLocation);

    if (!coordinates) return; // Stop if location not found

    // Update control center location
    controlCenter = {
        lat: coordinates.lat,
        lng: coordinates.lng
    };

    // Recenter map to new control center
    map.setView([coordinates.lat, coordinates.lng], 10);
    L.marker([coordinates.lat, coordinates.lng]).addTo(map)
        .bindPopup(`<strong>Control Center Set:</strong> ${controlLocation}`)
        .openPopup();

    alert(`Control center updated to ${controlLocation}`);
});

// Handle Disaster Form Submission
document.getElementById("report-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const disasterType = document.getElementById("disasterType").value;
    const location = document.getElementById("location").value;

    // Fetch coordinates from location
    const coordinates = await getCoordinates(location);

    if (!coordinates) return; // Stop if location not found

    const disaster = {
        type: disasterType,
        location: location,
        lat: coordinates.lat,
        lng: coordinates.lng
    };

    // Add to disaster list
    disasterData.push(disaster);

    // Add marker to map
    const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(map)
        .bindPopup(`<strong>${disasterType}</strong> at <em>${location}</em>`)
        .openPopup();

    // Show reported incidents in the list
    const incidentList = document.getElementById("incident-list");
    const incidentItem = document.createElement("li");
    incidentItem.innerHTML = `<strong>${disasterType}</strong> at <em>${location}</em> (Lat: ${coordinates.lat.toFixed(4)}, Lng: ${coordinates.lng.toFixed(4)})`;
    incidentList.appendChild(incidentItem);

    // Calculate shortest path from control center and show dispatch notification
    calculateShortestPath(controlCenter, { lat: coordinates.lat, lng: coordinates.lng });
});

// Get Latitude and Longitude Using OpenStreetMap Nominatim API
async function getCoordinates(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        } else {
            alert("Location not found. Please enter a valid location.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        alert("Error fetching coordinates. Please try again.");
        return null;
    }
}

// Dijkstra's Algorithm to Calculate Shortest Path
function calculateShortestPath(start, end) {
    const distance = getDistance(start.lat, start.lng, end.lat, end.lng);
    L.Routing.control({
        waypoints: [
            L.latLng(start.lat, start.lng),
            L.latLng(end.lat, end.lng)
        ],
        routeWhileDragging: true
    }).addTo(map);

    // Show dispatch notification
    showDispatchNotification(start, end, distance);
}

// Show Dispatch Notification with ETA
function showDispatchNotification(start, end, distance) {
    const speed = 60; // Average speed in km/h
    const eta = (distance / speed).toFixed(2); // ETA in hours

    // Create a styled pop-up notification
    const notification = document.createElement('div');
    notification.className = 'dispatch-notification';
    notification.innerHTML = `
        📦 <strong>Package Dispatched!</strong><br>
        ✅ From: Control Center (${start.lat.toFixed(4)}, ${start.lng.toFixed(4)})<br>
        🎯 To: Disaster Site (${end.lat.toFixed(4)}, ${end.lng.toFixed(4)})<br>
        ⏱️ Estimated Time of Arrival: <strong>${eta} hours</strong>
    `;

    document.body.appendChild(notification);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Calculate Distance Between Two Points Using Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Load map and center to initial position
document.addEventListener("DOMContentLoaded", () => {
    map.setView([controlCenter.lat, controlCenter.lng], 5);
});
