# Placeholder for Center Service

class CenterService:
    def get_nearby_centers(self, lat, lng, waste_type=None):
        centers = [
            {
                "id": "1",
                "name": "GVMC Dry Waste Collection Center",
                "facility_type": "Recycling",
                "address": "Visakhapatnam, Andhra Pradesh",
                "contact_number": "+91 891-2566532",
                "opening_hours": "Mon-Sat: 8AM-5PM",
                "accepted_waste_types": ["Plastic Waste", "Paper Waste", "Glass Waste"],
                "latitude": 17.6868,
                "longitude": 83.2185,
                "distance_km": 2.5,
                "marker_color": "blue"
            },
            {
                "id": "2",
                "name": "APPCB E-Waste Collection Center",
                "facility_type": "E-waste",
                "address": "Vijayawada, Andhra Pradesh",
                "contact_number": "+91 866-2443015",
                "opening_hours": "Mon-Fri: 9AM-6PM",
                "accepted_waste_types": ["E-waste", "Batteries", "Mobile Phones", "Chargers"],
                "latitude": 16.5062,
                "longitude": 80.6480,
                "distance_km": 348.0,
                "marker_color": "purple"
            },
            {
                "id": "3",
                "name": "Organic Compost Facility",
                "facility_type": "Organic",
                "address": "Guntur, Andhra Pradesh",
                "contact_number": "+91 863-2226888",
                "opening_hours": "Mon-Sat: 7AM-4PM",
                "accepted_waste_types": ["Organic Waste", "Food Waste"],
                "latitude": 16.3067,
                "longitude": 80.4365,
                "distance_km": 380.5,
                "marker_color": "green"
            },
            {
                "id": "4",
                "name": "Hazardous Waste Disposal Facility",
                "facility_type": "Hazardous",
                "address": "Kakinada, Andhra Pradesh",
                "contact_number": "+91 884-2365285",
                "opening_hours": "Mon-Fri: 9AM-4PM",
                "accepted_waste_types": ["Paint Cans", "Chemicals", "Medical Waste"],
                "latitude": 16.9891,
                "longitude": 82.2475,
                "distance_km": 150.2,
                "marker_color": "red"
            },
            {
                "id": "5",
                "name": "Municipal Recycling Center",
                "facility_type": "Recycling",
                "address": "Tirupati, Andhra Pradesh",
                "contact_number": "+91 877-2283088",
                "opening_hours": "Mon-Sun: 8AM-8PM",
                "accepted_waste_types": ["Plastic", "Paper", "Metal", "Glass"],
                "latitude": 13.6288,
                "longitude": 79.4192,
                "distance_km": 730.0,
                "marker_color": "blue"
            },
            {
                "id": "6",
                "name": "Solid Waste Management Facility",
                "facility_type": "General Waste",
                "address": "Rajahmundry, Andhra Pradesh",
                "contact_number": "+91 883-2475855",
                "opening_hours": "Mon-Sun: 24/7",
                "accepted_waste_types": ["Mixed Waste"],
                "latitude": 17.0005,
                "longitude": 81.8040,
                "distance_km": 200.0,
                "marker_color": "orange"
            }
        ]

        if waste_type and waste_type.strip():
            filtered = [c for c in centers if any(waste_type.lower() in wt.lower() for wt in c['accepted_waste_types'])]
            if filtered:
                centers = filtered

        # Sort by distance
        centers.sort(key=lambda x: x["distance_km"])
        
        return centers
