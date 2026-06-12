import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

const API = 'https://opendata.rijksoverheid.nl/v1/infotypes/schoolholidays?format=json&refine.type=schoolvakanties';

const getAfbeelding = (type) => {
  const t = type.toLowerCase();
  if (t.includes('kerst')) return require('../assets/winter.png');
  if (t.includes('herfst')) return require('../assets/herfst.png');
  if (t.includes('voorjaar') || t.includes('mei')) return require('../assets/lente.png');
  return require('../assets/zomer.png');
};

export default function Countdown({ region, year }) {
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        const schoolYear = data.find((x) => x.content?.[0]?.schoolyear?.trim() === year);
        const vacations = schoolYear?.content?.[0]?.vacations || [];
        const items = vacations.map((v) => {
          const r = v.regions.find((x) => x.region === region) || v.regions[0];
          return { type: v.type.trim(), date: r.startdate };
        });
        setNext(items.filter((x) => new Date(x.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date))[0]);
      })
      .catch(() => setNext(null));
  }, [region, year]);

  const days = next ? Math.ceil((new Date(next.date) - new Date()) / 86400000) : null;

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Countdown</Text>
      {next ? (
        <>
          <Image source={getAfbeelding(next.type)} style={{ width: 300, height: 300, marginBottom: 20 }} resizeMode="contain" />
          <Text>{days} dagen tot {next.type}</Text>
        </>
      ) : (
        <Text>Geen vakantie gevonden</Text>
      )}
    </View>
  );
}
