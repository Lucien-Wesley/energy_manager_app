import React, { useState } from 'react';
import {

View,
Text,
TextInput,
Modal,
TouchableOpacity,
StyleSheet,
} from 'react-native';

interface AddRoomDialogProps {
visible: boolean;
onClose: () => void;
onAddRoom: (room: { name: string }) => void;
}

const AddRoomDialog: React.FC<AddRoomDialogProps> = ({ visible, onClose, onAddRoom }) => {
const [roomName, setRoomName] = useState('');

const handleAddRoom = () => {
    if (roomName.trim()) {
        onAddRoom({ name: roomName });
        onClose();
        setRoomName('');
    }
};

return (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
            <View style={styles.dialog}>
                <Text style={styles.title}>Add New Room</Text>

                <Text style={styles.label}>Room Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter room name"
                    placeholderTextColor="#888"
                    value={roomName}
                    onChangeText={setRoomName}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelBtn}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddRoom}>
                        <Text style={styles.addBtn}>Add</Text>
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
input: {
    borderBottomColor: '#2e7d32',
    borderBottomWidth: 1,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    fontFamily: 'regular',
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
addBtn: {
    color: '#2e7d32',
    fontSize: 16,
    fontFamily: 'bold',
},
});

export default AddRoomDialog;