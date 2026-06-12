import { Image, Text, View } from 'react-native';

export default function About() {
  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <Image source={require('../assets/icon.png')} style={{ width: 300, height: 300, borderRadius: 150 }} resizeMode="contain" />
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>About</Text>
      <Text>Schoolvakanties app gemaakt door Sedow</Text>
    </View>
  );
}
