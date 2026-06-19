import { Image, Text, View } from 'react-native';

export default function About({ isLandscape }) {
  return (
    <View style={{
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: isLandscape ? 'row' : 'column',
      gap: 20
    }}>
      <Image source={require('../assets/icon.png')} style={{ width: isLandscape ? 150 : 300, height: isLandscape ? 150 : 300, borderRadius: isLandscape ? 75 : 150 }} resizeMode="contain" />
      <View style={{ alignItems: isLandscape ? 'flex-start' : 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>About</Text>
        <Text style={{ textAlign: isLandscape ? 'left' : 'center' }}>Schoolvakanties app{'\n'}gemaakt door Sedow</Text>
      </View>
    </View>
  );
}
