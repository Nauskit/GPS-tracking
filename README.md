GPS Tracking System

A real-time vehicle tracking system with admin and user dashboards. Includes real-time location updates, route history, alerts (overspeed, geofencing), and user/device management. Built with modern technologies like React, Node.js, MongoDB, Redis, and Socket.IO.

---

### Features ###

Core System
- User authentication (JWT + role-based: `admin`, `user`)
- Vehicle management (CRUD operations)
- Real-time GPS location tracking via WebSocket
- Interactive map using Leaflet.js
- View route history for each vehicle

Notifications & Alerts
- Redis Pub/Sub for event-driven alerts (e.g., overspeed)
- Background worker to detect conditions and send alerts
- Real-time alert popup on frontend

Security
- Rate limiting to protect APIs
- Secure CORS setup

DevOps
- Dockerized backend & frontend
- `docker-compose` setup for development & production
- Ready for deployment on platforms like Render
