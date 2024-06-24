import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#00bfff',
  text: '#fff',
};

export default function IndexScreen() {
  const navigation = useNavigation();

  const handleNavigateToSurivalItems = (category) => {
    navigation.navigate('survivalItems', { category });
  };

  const handleNavigateToHygieneItems = (category) => {
    navigation.navigate('hygieneItems', { category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.ribbon}>
        <Text style={styles.ribbonText}>Almoxarifado Escoteiro</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigateToSurivalItems('Sobrevivência')}>
          <Text style={styles.buttonText}>Itens de Sobrevivência</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigateToHygieneItems('Higiene')}>
          <Text style={styles.buttonText}>Itens de Higiene</Text>
        </TouchableOpacity>
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
  ribbon: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  ribbonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
});
