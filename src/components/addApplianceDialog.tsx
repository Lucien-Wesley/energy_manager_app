import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    IconButton,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Room {
    id: string;
    name: string;
}

interface AddApplianceDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (appliance: {
        name: string;
        addressEnrf: string;
        relayPort: string;
        power: number;
        roomId: string;
    }) => void;
    rooms: Room[];
}

const AddApplianceDialog: React.FC<AddApplianceDialogProps> = ({ open, onClose, onAdd, rooms }) => {
    const [name, setName] = useState('');
    const [addressEnrf, setAddressEnrf] = useState('');
    const [relayPort, setRelayPort] = useState('');
    const [power, setPower] = useState<number | ''>('');
    const [roomId, setRoomId] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleAdd = () => {
        if (name && addressEnrf && relayPort && power && roomId) {
            onAdd({ name, addressEnrf, relayPort, power: Number(power), roomId });
            handleClose();
        }
    };

    const handleClose = () => {
        setName('');
        setAddressEnrf('');
        setRelayPort('');
        setPower('');
        setRoomId('');
        setDropdownVisible(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Appliance</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address ENRF"
                    value={addressEnrf}
                    onChange={(e) => setAddressEnrf(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Relay Port"
                    value={relayPort}
                    onChange={(e) => setRelayPort(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Power (kWh)"
                    type="number"
                    value={power}
                    onChange={(e) => setPower(e.target.value === '' ? '' : Number(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ position: 'relative', marginBottom: 2 }}>
                    <TextField
                        label="Room"
                        value={roomId}
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setDropdownVisible(!dropdownVisible)}>
                                    {dropdownVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                    {dropdownVisible && (
                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: 10,
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: 4,
                                maxHeight: 150,
                                overflowY: 'auto',
                                width: '100%',
                            }}
                        >
                            {rooms.map((room) => (
                                <MenuItem
                                    key={room.id}
                                    value={room.id}
                                    onClick={() => {
                                        setRoomId(room.id);
                                        setDropdownVisible(false);
                                    }}
                                >
                                    {room.name}
                                </MenuItem>
                            ))}
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary" disabled={!name || !addressEnrf || !relayPort || !power || !roomId}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddApplianceDialog;