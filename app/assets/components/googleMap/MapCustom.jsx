import Map, {NavigationControl,Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapCustom({location}) {
  const [latitude,longitude] = location.split(',')

  return (
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: Number(longitude) ? Number(longitude) : 16.62662018,
          latitude: Number(latitude) ? Number(latitude) : 49.2125578,
          zoom: 14
        }}
        style={{width: "100vw", height: "280px"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=cQfIyzzmkb9xT9JPni3n"
      >
        <NavigationControl position="top-left" />
        <Marker
        longitude={Number(longitude) ? Number(longitude) : 16.62662018}
        latitude={Number(latitude) ? Number(latitude) : 49.2125578}
        color='#FF507D'
        />
      </Map>
  )
}
