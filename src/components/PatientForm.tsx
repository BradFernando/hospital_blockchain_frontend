import React, { useState, ChangeEvent, FormEvent } from 'react';
import './style.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// @ts-ignore
import Swal from 'sweetalert2';

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

// Verificar si los campos están vacíos
        if (!patient.patientId || !patient.name || !patient.diagnosis) {
            // Mostrar la alerta de SweetAlert2
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Todos los campos son requeridos!',
            });
            return;
        }

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
                Swal.fire({
                    icon: 'success',
                    title: 'Blockchain añadido',
                    text: 'El bloque se ha añadido correctamente!',
                });
            })
            .catch(error => {
                console.error('Error adding block:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al añadir el Blockchain. Inténtalo de nuevo más tarde.',
                });
            });
    };


    return (
        <Card className="container">
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Add Patient</h2>
                    <div className="form-group">
                        <label className="form-label">Patient ID</label>
                        <input type="text" name="patientId" value={patient.patientId} onChange={handleChange}
                               className="form-input" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={patient.name} onChange={handleChange}
                               className="form-input" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Diagnosis</label>
                        <input type="text" name="diagnosis" value={patient.diagnosis} onChange={handleChange}
                               className="form-input" required/>
                    </div>
                    <button type="submit" className="submit-button">
                        <AccountBalanceWalletIcon/>
                        Add Block
                    </button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PatientForm;