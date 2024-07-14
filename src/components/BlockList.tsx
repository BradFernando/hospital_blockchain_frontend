import React, { useState } from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fingerprint from '@mui/icons-material/Fingerprint';

interface Block {
    index: number;
    timestamp: number;
    data: any;
    hash: string;
    previous_hash: string;
}

interface BlockListProps {
    blocks: Block[];
}

const BlockList: React.FC<BlockListProps> = ({ blocks }) => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const handleOpen = (data: any) => {
        setModalData(data);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="container bg-emerald-500">
            <h2 className="blockchain-title">Blockchain</h2>
            <ul className="block-list">
                {blocks.map((block) => (
                    <li key={block.hash} className="block-item">
                        <p><strong>Index:</strong> {block.index}</p>
                        <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
                        <Button
                            onClick={() => handleOpen(block.data)}
                            variant="contained"
                            color="success"
                            startIcon={<Fingerprint />}
                        >
                            Mostrar Datos
                        </Button>
                        <p><strong>Hash:</strong> {block.hash}</p>
                        <p><strong>Previous Hash:</strong> {block.previous_hash}</p>
                    </li>
                ))}
            </ul>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Fingerprint /> <b>Data del Bloque</b>
                    </Typography>
                    <div>
                        {typeof modalData === 'string' ? (
                            <p><strong>Data:</strong> {modalData}</p>
                        ) : (
                            <>
                                <p>
                                    <strong>Date:</strong> {new Date(modalData?.date).toLocaleString("es-EC", {timeZone: "America/Guayaquil"})}
                                </p>
                                <p><strong>Diagnosis:</strong> {modalData?.diagnosis}</p>
                                <p><strong>Name:</strong> {modalData?.name}</p>
                                <p><strong>Patient ID:</strong> {modalData?.patientId}</p>
                            </>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default BlockList;