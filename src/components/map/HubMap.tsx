import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix Leaflet default marker icon bug with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const hubCoordinates: Record<string, [number, number]> = {
  'Agadir Grand Taxi Station': [30.4202, -9.5982],
  'Marrakech CTM Bus Station': [31.6259, -7.9891],
  'Essaouira Grand Taxi Stand': [31.5125, -9.7699],
  'Casablanca Ouled Ziane Bus Terminal': [33.5731, -7.5898],
  'Imsouane Taxi Stop': [30.8488, -9.8194],
}

const grandTaxiIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'hue-rotate-[120deg]',
})

const busIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'hue-rotate-[200deg]',
})

interface Hub {
  id: string
  name: string
  city: string
  address: string
  type: 'Grand Taxi' | 'Bus'
  notes: string
  hub_destinations: { destination: string }[]
}

interface Props {
  hubs: Hub[]
}

export default function HubMap({ hubs }: Props) {
  return (
    <MapContainer
      center={[31.0, -7.0]}
      zoom={6}
      style={{ height: '420px', width: '100%', borderRadius: '12px', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hubs.map(hub => {
        const coords = hubCoordinates[hub.name]
        if (!coords) return null
        return (
          <Marker
            key={hub.id}
            position={coords}
            icon={hub.type === 'Bus' ? busIcon : grandTaxiIcon}
          >
            <Popup>
              <div style={{ minWidth: '180px' }}>
                <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '13px' }}>{hub.name}</p>
                <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '6px' }}>{hub.address}</p>
                <p style={{ fontSize: '12px', marginBottom: '4px', color: '#374151' }}>{hub.notes}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                  {hub.hub_destinations.map(d => (
                    <span
                      key={d.destination}
                      style={{
                        fontSize: '11px',
                        background: '#f3f4f6',
                        padding: '2px 8px',
                        borderRadius: '99px',
                        color: '#374151'
                      }}
                    >
                      {d.destination}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}