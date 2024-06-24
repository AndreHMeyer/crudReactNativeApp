import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, FlatList, Modal, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/Themed';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [itemState, setItemState] = useState('Bom');
  const [itemQuantity, setItemQuantity] = useState('');
  const [productList, setProductList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSaveItem = () => {
    if (selectedItemId) {
      const updatedList = productList.map(item => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            name: itemName,
            state: itemState,
            quantity: itemQuantity,
          };
        }
        return item;
      });
      setProductList(updatedList);
    } else {
      const newItem = {
        id: Math.random().toString(),
        name: itemName,
        state: itemState,
        quantity: itemQuantity,
      };
      setProductList([...productList, newItem]);
    }

    setIsModalVisible(false);
    setItemName('');
    setItemState('Bom');
    setItemQuantity('');
    setSelectedItemId(null);
  };

  const handleDeleteItem = (itemId) => {
    const updatedList = productList.filter(item => item.id !== itemId);
    setProductList(updatedList);
  };

  const handleEditItem = (item) => {
    setSelectedItemId(item.id);
    setItemName(item.name);
    setItemState(item.state);
    setItemQuantity(item.quantity);
    setIsModalVisible(true);
  };

  const CustomButton = ({ title, onPress, color }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Itens de Higiene</Text>
      </View>

      <View style={styles.content}>
        <Button title="Novo Item" onPress={() => {
          setSelectedItemId(null);
          setIsModalVisible(true);
        }} />

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={itemName}
                onChangeText={setItemName}
              />

              <Picker
                selectedValue={itemState}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setItemState(itemValue)}
              >
                <Picker.Item label="Bom" value="Bom" />
                <Picker.Item label="Médio" value="Médio" />
                <Picker.Item label="Ruim" value="Ruim" />
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={itemQuantity}
                onChangeText={setItemQuantity}
              />

              <View style={styles.buttonContainer}>
                <CustomButton title="Salvar" onPress={handleSaveItem} color="#2196f3" />
                <CustomButton title="Cancelar" onPress={() => setIsModalVisible(false)} color="#f44336" />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <FlatList
        style={styles.productList}
        data={productList}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.itemDetail}>Estado: <Text style={styles.blackText}>{item.state}</Text></Text>
              <Text style={styles.itemDetail}>Quantidade: <Text style={styles.blackText}>{item.quantity}</Text></Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditItem(item)} style={[styles.editButton, styles.actionButton]}>
                <Ionicons name="pencil" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={[styles.deleteButton, styles.actionButton]}>
                <Ionicons name="trash-bin" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyList}>Nenhum item cadastrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  productList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  itemDetail: {
    color: '#333',
  },
  blackText: {
    color: '#000',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#2196f3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
