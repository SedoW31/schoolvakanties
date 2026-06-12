import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, useWindowDimensions, View } from 'react-native';

import About from './screens/About';
import Countdown from './screens/Countdown';
import Overzicht from './screens/Overzicht';
import Settings from './screens/Settings';

const KEY = 'settings';
const DEFAULT_REGION = 'midden';
const DEFAULT_YEAR = '2025-2026';
const TABS = ['Overzicht', 'Countdown', 'Settings', 'About'];

function loadSettings(value) {
  if (!value) return {};

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function renderScreen(screen, props, isLandscape) {
  if (screen === 'Overzicht') {
    return <Overzicht {...props} isLandscape={isLandscape} />;
  }

  if (screen === 'Countdown') {
    return <Countdown {...props} />;
  }

  if (screen === 'Settings') {
    return <Settings {...props} />;
  }

  return <About />;
}

export default function App() {
  const [screen, setScreen] = useState('Overzicht');
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [gps, setGps] = useState(null);
  const [ready, setReady] = useState(false);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((value) => {
      const data = loadSettings(value);
      setRegion(data.region || DEFAULT_REGION);
      setYear(data.year || DEFAULT_YEAR);
      setGps(data.gps || null);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;

    AsyncStorage.setItem(KEY, JSON.stringify({ region, year, gps }));
  }, [ready, region, year, gps]);

  const props = { region, setRegion, year, setYear, gps, setGps, isLandscape };

  return (
    <SafeAreaView style={{ flex: 1, padding: 12, paddingBottom: 70, backgroundColor: '#fff' }}>
      <Text>Regio: {region} | Schooljaar: {year}</Text>

      <View style={{ flex: 1 }}>{renderScreen(screen, props, isLandscape)}</View>

      <View style={{ flexDirection: 'row', gap: 6 }}>
        {TABS.map((name) => (
          <Pressable key={name} onPress={() => setScreen(name)} style={{ flex: 1, padding: 8, backgroundColor: screen === name ? '#ddd' : '#f5f5f5' }}>
            <Text style={{ textAlign: 'center' }}>{name}</Text>
          </Pressable>
        ))}
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
