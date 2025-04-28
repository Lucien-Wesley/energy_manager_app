import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface WifiDialogProps {
  visible: boolean;
  onClose: () => void;
  onConnect: (credentials: { ssid: string; password: string }) => void;
}

const WifiDialog: React.FC<WifiDialogProps> = ({ visible, onClose, onConnect }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [networks, setNetworks] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
      ]);
      return granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const loadWifiList = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    WifiManager.loadWifiList()
      .then(list => {
        const ssidList = list.map(net => net.SSID).filter(Boolean);
        setNetworks(ssidList);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (visible) loadWifiList();
  }, [visible]);

  const handleConnect = () => {
    onConnect({ ssid, password });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Connexion Wi-Fi</Text>

          <Text style={styles.label}>Réseau Wi-Fi</Text>
          {/* Champ personnalisé avec flèche */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <TextInput
              style={styles.underlinedInput}
              placeholder="Nom du réseau"
              placeholderTextColor="#888"
              value={ssid}
              onChangeText={setSsid}
            />
            <Icon name={dropdownVisible ? 'expand-less' : 'expand-more'} size={24} color="#000" />
          </TouchableOpacity>

          {/* Liste déroulante */}
          {dropdownVisible && (
            <View style={styles.dropdownList}>
              <FlatList
                data={networks}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSsid(item);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text style={{ color: '#000' }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <Text style={styles.label}>Mot de passe</Text>
          <TouchableOpacity
            style={styles.inputContainer}
          >
            <TextInput
                style={styles.underlinedInput}
                placeholder="Mot de passe"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
        </TouchableOpacity>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelBtn}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConnect}>
              <Text style={styles.connectBtn}>Se connecter</Text>
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

export default WifiDialog;
