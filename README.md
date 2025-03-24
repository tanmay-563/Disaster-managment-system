🆘 Disaster Management System 🚨
A web-based disaster management system that dynamically identifies the affected location and calculates the shortest route from a user-defined source to the disaster site. The project integrates map visualization with shortest path calculation using Dijkstra’s algorithm.

🎯 Features
✅ Real-time map integration with OpenStreetMap (Leaflet.js).
✅ User inputs the disaster location and type for accurate response.
✅ Calculates the shortest route from the user-defined source location to the disaster location.
✅ Dijkstra’s algorithm to compute the shortest path.
✅ Displays route, distance, and estimated arrival time dynamically.

🚀 Tech Stack
Frontend: HTML, CSS, JavaScript

Mapping API: Leaflet.js + OpenStreetMap

Geocoding API: Nominatim OpenStreetMap API

Algorithm: Dijkstra’s algorithm for shortest path

📚 How to Run Locally
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/tanmay-563/disaster-management-system.git
Open the Project:

bash
Copy
Edit
cd disaster-management-system
Open index.html in Browser:

bash
Copy
Edit
open index.html
(or just double-click to open it)

🗺️ How It Works
User Reports Disaster:

Enter the type of disaster and location.

Click “Report Disaster” to process the information.

Location Detection:

Fetches latitude and longitude from the entered location.

Uses Dijkstra’s algorithm to calculate the shortest route between the source and the disaster site.

Shortest Path Calculation:

Displays the shortest path on the map.

Shows distance and estimated arrival time dynamically.

Real-Time Package Dispatch Message:

Displays a confirmation message when a package is dispatched to the disaster site.

🤝 Contributing
💡 Feel free to contribute or raise any issues!

Fork the repo.

Create a new branch (git checkout -b feature/new-feature).

Commit changes (git commit -m "Add new feature").

Push the branch (git push origin feature/new-feature).

Open a Pull Request.

🎉 Show Some Love!
🌟 Star the repo if you found it helpful! 😊
📢 Share with friends who might find it useful! ❤️

