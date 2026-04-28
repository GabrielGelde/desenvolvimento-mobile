import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import imgWill from "./assets/splash-icon.jpg"
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [texto, setTexto] = useState("");

  return (
    <View style={styles.container}>
      <Text>Aula 01 ↖↗↙↘ teste </Text>
      <StatusBar style="auto" />
      <View>
        <Text>Teste2</Text>
        <TextInput onChangeText={setTexto} />
        <Text>Valor{texto}</Text>
        <TouchableOpacity>
          <Text>
            Clique Aqui
          </Text>
        </TouchableOpacity>
        <Image style={styles.imgWill}
        source={imgWill} width={300} height={200} /> 
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
