import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import BlockList from './components/BlockList';

import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface Block {
    index: number;
    timestamp: number;
    data: any;
    hash: string;
    previous_hash: string; // Asegúrate de que coincide con el nombre del campo en el backend
}

const App: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/blockchain/chain')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blockchain data');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.chain)) {
                    // Mapea los datos del backend a la estructura de bloque en el frontend
                    const formattedBlocks = data.chain.map((block: any) => ({
                        index: block.index,
                        timestamp: block.timestamp,
                        data: block.data,
                        hash: block.hash,
                        previous_hash: block.previous_hash, // Asegúrate del nombre correcto aquí
                    }));
                    setBlocks(formattedBlocks);
                } else {
                    throw new Error('Received data is not valid');
                }
            })
            .catch(error => {
                console.error('Error fetching blockchain data:', error);
                // Puedes manejar el error aquí según tu lógica de aplicación
            });
    }, []);

    const addBlock = (block: Block) => {
        setBlocks(prevBlocks => [block, ...prevBlocks]); // Agregar nuevo bloque al inicio
    };

    return (
        <div className="container mx-auto p-4 ">

            <Typography variant="h3" gutterBottom align="center">
                <AssignmentIcon sx={{fontSize: 50}}/>
                Blockchain de Registros de Pacientes


            </Typography>


            <hr style={{borderTop: "4px solid orange"}}/>
            <PatientForm onAddBlock={addBlock}/>
            <hr style={{borderTop: "4px solid orange"}}/>
            <BlockList blocks={blocks} />
        </div>
    );
};

export default App;
