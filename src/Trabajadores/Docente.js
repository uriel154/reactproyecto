import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
            const data = await response.json();
            setClientes(data);
        };

        fetchData();
    }, []);

    // Preparar datos para el gráfico
    const chartData = {
        labels: clientes.map(cliente => cliente.nombre),
        datasets: [
            {
                label: 'IDs de Clientes',
                data: clientes.map(cliente => cliente.id),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(104, 162, 235, 0.6)',
                ],
            },
        ],
    };

    return (
        <div>
            <h1 className="App-link">LISTA DE CLIENTES ING. ALEX</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {clientes.map((cliente) => (
                    <div key={cliente.id} style={{
                        border: '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '8px',
                        margin: '10px',
                        width: '200px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                    }}>
                        <p><strong>Identificación:</strong> {cliente.id}</p>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                        <p><strong>Género:</strong> {cliente.genero}</p>
                    </div>
                ))}
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Gráfico de ID de Clientes</h2>
            <div style={{ width: '70%', margin: '0 auto' }}>
                <Bar data={chartData} options={{
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
};

export default ListaClientes;