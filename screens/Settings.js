import * as Location from 'expo-location';
import { Pressable, ScrollView, Text, View } from 'react-native';

const years = ['2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029', '2029-2030'];
const regions = ['noord', 'midden', 'zuid'];

export default function Settings({ region, setRegion, year, setYear, gps, setGps }) {
  async function gpsRegio() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') return;

    const loc = await Location.getCurrentPositionAsync({});
    const lat = loc.coords.latitude;

    setGps({ lat, lon: loc.coords.longitude });
    setRegion(lat > 52.5 ? 'noord' : lat < 51.7 ? 'zuid' : 'midden');
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Settings</Text>
      <Text>Regio</Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {regions.map((x) => <Button key={x} text={x} active={region === x} onPress={() => setRegion(x)} />)}
      </View>
      <Button text="Gebruik GPS" onPress={gpsRegio} />
      {gps && <Text>Locatie: {gps.lat.toFixed(4)}, {gps.lon.toFixed(4)}</Text>}

      <Text>Schooljaar</Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {years.map((x) => <Button key={x} text={x} active={year === x} onPress={() => setYear(x)} />)}
      </View>
    </ScrollView>
  );
}

function Button({ text, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 10, backgroundColor: active ? '#ddd' : '#eee' }}>
      <Text>{text}</Text>
    </Pressable>
  );
}
