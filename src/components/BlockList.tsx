import React from 'react';
import './style.css';

interface Block {
    index: number;
    timestamp: number;
    data: any;
    hash: string;
    previous_hash: string; // Asegúrate de que coincide con el nombre del campo en el backend
}

interface BlockListProps {
    blocks: Block[];
}

const BlockList: React.FC<BlockListProps> = ({ blocks }) => {
    return (
        <div className="container">
            <h2 className="blockchain-title">Blockchain</h2>
            <ul className="block-list">
                {blocks.map((block) => (
                    <li key={block.hash} className="block-item">
                        <p><strong>Index:</strong> {block.index}</p>
                        <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
                        <p><strong>Data:</strong> {JSON.stringify(block.data)}</p>
                        <p><strong>Hash:</strong> {block.hash}</p>
                        <p><strong>Previous Hash:</strong> {block.previous_hash}</p> {/* Asegúrate del nombre correcto aquí */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlockList;
