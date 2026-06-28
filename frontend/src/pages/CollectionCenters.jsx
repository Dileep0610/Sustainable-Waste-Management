import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Map, Search, MapPin, Loader2, AlertCircle, Phone, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom colored icons
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  blue: createIcon('blue'),
  purple: createIcon('violet'),
  green: createIcon('green'),
  red: createIcon('red'),
  orange: createIcon('orange')
};

// Component to recenter map when selected center changes
const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.latitude, center.longitude], 14, {
        animate: true,
      });
    }
  }, [center, map]);
  return null;
};

const CollectionCenters = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    fetchCenters();
  }, [wasteType]);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const query = new URLSearchParams();
      if (wasteType) query.append('waste_type', wasteType);
      
      const response = await api.get(`/get-centers?${query.toString()}`);
      if (response.data.success) {
        setCenters(response.data.data.centers);
      } else {
        setError('Failed to fetch centers');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCenters = centers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const defaultCenter = [17.6868, 83.2185]; // Visakhapatnam center

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Collection Centers</h1>
          <p className="text-gray-600 dark:text-zinc-400 font-sans mt-1">Find nearby waste drop-off and recycling centers.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select 
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-mono transition-colors"
          >
            <option value="">All Waste Types</option>
            <option value="Plastic">Plastic Waste</option>
            <option value="Paper">Paper Waste</option>
            <option value="Glass">Glass Waste</option>
            <option value="Metal">Metal Waste</option>
            <option value="E-waste">E-waste</option>
            <option value="Organic">Organic Waste</option>
            <option value="Hazardous">Hazardous Waste</option>
          </select>
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search locations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-mono"
            />
            <Search className="w-5 h-5 text-gray-400 dark:text-zinc-500 absolute left-3 top-2.5 transition-colors" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 min-h-[600px] h-full">
        {/* Map */}
        <div className="md:col-span-1 lg:col-span-2 card p-0 overflow-hidden relative flex items-center justify-center z-0">
          {loading && centers.length === 0 ? (
             <div className="flex flex-col items-center justify-center text-primary-500 h-full">
               <Loader2 className="w-8 h-8 animate-spin mb-2" />
               <p className="font-mono">Loading map...</p>
             </div>
          ) : error && centers.length === 0 ? (
             <div className="flex flex-col items-center justify-center text-red-500 h-full">
               <AlertCircle className="w-8 h-8 mb-2" />
               <p className="font-sans text-red-400">{error}</p>
             </div>
          ) : (
            <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapRecenter center={selectedCenter} />
              {filteredCenters.map(center => (
                <Marker 
                  key={center.id} 
                  position={[center.latitude, center.longitude]}
                  icon={icons[center.marker_color === 'purple' ? 'purple' : center.marker_color] || icons.blue}
                  eventHandlers={{
                    click: () => setSelectedCenter(center),
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <h4 className="font-semibold text-gray-900">{center.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{center.facility_type}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3" /> {center.distance_km} km away
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Center List */}
        <div className="card overflow-hidden space-y-4 max-h-full flex flex-col h-full lg:h-[calc(100vh-200px)] lg:max-h-[600px]">
          <h3 className="font-heading font-bold uppercase tracking-wide text-gray-900 dark:text-zinc-100 text-xl border-b border-gray-200 dark:border-zinc-800 pb-3 sticky top-0 bg-white dark:bg-zinc-900 z-10 flex-shrink-0 transition-colors">Nearby Centers</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {loading ? (
              <div className="flex justify-center py-8 text-primary-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : filteredCenters.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-zinc-500">
                <MapPin className="w-10 h-10 mx-auto text-gray-400 dark:text-zinc-600 mb-2 transition-colors" />
                <p className="font-sans">No centers found.</p>
              </div>
            ) : (
              filteredCenters.map((center) => (
                <div 
                  key={center.id} 
                  onClick={() => setSelectedCenter(center)}
                  className={`p-4 border rounded-xl transition-all cursor-pointer group flex-shrink-0 ${
                    selectedCenter?.id === center.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500' : 'border-gray-200 dark:border-zinc-800 hover:border-primary-300 dark:hover:border-primary-500/50 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-heading font-bold text-lg uppercase tracking-wide text-gray-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{center.name}</h4>
                    <span className="text-xs bg-primary-50 dark:bg-primary-900/40 border border-primary-200 dark:border-primary-500/30 text-primary-700 dark:text-primary-400 px-2 py-1 rounded-md font-mono font-bold tracking-tight uppercase whitespace-nowrap ml-2 transition-colors">
                      {center.distance_km} km
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 font-sans flex items-start gap-1 mb-1 transition-colors break-words">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {center.address}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 font-sans flex items-start gap-1 mb-1 transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {center.contact_number}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 font-sans flex items-start gap-1 mb-3 transition-colors">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {center.opening_hours}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {center.accepted_waste_types.map((type, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-mono font-bold tracking-tight uppercase px-2 py-1 rounded-md transition-colors">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCenters;
