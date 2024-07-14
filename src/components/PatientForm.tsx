import React, { useState, ChangeEvent, FormEvent } from 'react';
import './style.css';

interface PatientFormProps {
    onAddBlock: (block: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onAddBlock }) => {
    const [patient, setPatient] = useState({ patientId: '', name: '', diagnosis: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/blockchain/add_block', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add block');
                }
                return response.json();
            })
            .then(data => {
                onAddBlock(data.block); // Asegurarse de pasar el bloque correcto
                setPatient({ patientId: '', name: '', diagnosis: '' });
            })
            .catch(error => {
                console.error('Error adding block:', error);
                // Puedes manejar el error aquí según tu lógica de aplicación
            });
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2 className="form-title">Add Patient</h2>
            <div className="form-group">
                <label className="form-label">Patient ID</label>
                <input type="text" name="patientId" value={patient.patientId} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={patient.name} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
                <label className="form-label">Diagnosis</label>
                <input type="text" name="diagnosis" value={patient.diagnosis} onChange={handleChange} className="form-input" required />
            </div>
            <button type="submit" className="submit-button">Add Block</button>
        </form>
    );
};

export default PatientForm;
