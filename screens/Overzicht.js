import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const API = 'https://opendata.rijksoverheid.nl/v1/infotypes/schoolholidays?format=json&refine.type=schoolvakanties';

export default function Overzicht({ region, year, isLandscape }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        const schoolYear = data.find((x) => x.content?.[0]?.schoolyear?.trim() === year);
        setList(schoolYear?.content?.[0]?.vacations || []);
      })
      .catch(() => setList([]));
  }, [year]);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, flexDirection: isLandscape ? 'row' : 'column', flexWrap: 'wrap', gap: 8 }}>
      <Text style={{ width: '100%', fontSize: 24, fontWeight: 'bold' }}>Overzicht</Text>
      {list.map((vacation) => {
        const r = vacation.regions.find((x) => x.region === region) || vacation.regions[0];
        return (
          <View key={vacation.type} style={{ width: isLandscape ? '48%' : '100%', padding: 10, backgroundColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{vacation.type.trim()}</Text>
            <Text>{r.region}: {r.startdate.slice(0, 10)} t/m {r.enddate.slice(0, 10)}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
