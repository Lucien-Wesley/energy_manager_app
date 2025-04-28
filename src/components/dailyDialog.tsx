import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface DailyDialogProps {
  visible: boolean;
  onClose: () => void;
  onConnect: (credentials: { consommation: number }) => void;
}

const DailyDialog: React.FC<DailyDialogProps> = ({ visible, onClose, onConnect }) => {
  const [consommation, setConsommation] = useState(0);

  
  const handleConnect = () => {
    onConnect({ consommation });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Daily max consumption</Text>

          <Text style={styles.label}>Max consumption (kwh)</Text>
          {/* Champ personnalisé avec flèche */}
          <TouchableOpacity
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.underlinedInput}
              placeholder="Nom du réseau"
              placeholderTextColor="#888"
              value={consommation.toString()}
              keyboardType="numeric"
              onChangeText={text => setConsommation(Number(text))}
            />
          </TouchableOpacity>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelBtn}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConnect}>
              <Text style={styles.connectBtn}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
  },
  dialog: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    color: '#2e7d32',
    marginBottom: 15,
    fontFamily: 'bold',
  },
  label: {
    marginTop: 10,
    fontFamily: 'regular',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#2e7d32',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 5,
  },
  underlinedInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: 'regular',
  },
  dropdownList: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  cancelBtn: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'regular',
  },
  connectBtn: {
    color: '#2e7d32',
    fontSize: 16,
    fontFamily: 'bold',
  },
});

export default DailyDialog;
