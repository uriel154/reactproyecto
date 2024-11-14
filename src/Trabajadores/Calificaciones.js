import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const Calificaciones = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                console.log('Datos de la API: ', data);  // Verifica los datos completos
                setAlumnos(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="App-link">CALIFICACIONES DEL ING. ALEX RAMÍREZ GALINDO</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {alumnos.map((alumno) => {
                    // Acceder al objeto 'practicas' y extraer las calificaciones
                    const calificaciones = alumno.practicas 
                        ? Object.entries(alumno.practicas).map(([practica, cal]) => ({ practica, calificacion: parseFloat(cal) })) 
                        : [];

                    console.log(`Calificaciones de ${alumno.nombre}: `, calificaciones);  // Verifica las calificaciones

                    // Filtrar las calificaciones para asegurarse de que son números válidos
                    const calificacionesNumericas = calificaciones.filter(({ calificacion }) => !isNaN(calificacion) && calificacion >= 0 && calificacion <= 10);
                    console.log(`Calificaciones filtradas de ${alumno.nombre}: `, calificacionesNumericas);  // Verifica las calificaciones filtradas

                    // Calcular el promedio si hay calificaciones válidas
                    const promedio = calificacionesNumericas.length > 0
                        ? (calificacionesNumericas.reduce((sum, { calificacion }) => sum + calificacion, 0) / calificacionesNumericas.length).toFixed(2)
                        : 'No Disponible'; // En caso de que no haya calificaciones válidas

                    // Datos para el gráfico de calificaciones
                    const chartData = {
                        labels: calificacionesNumericas.map(({ practica }) => practica), // Usar los nombres de las prácticas
                        datasets: [
                            {
                                label: 'Promedio de Calificaciones',
                                data: calificacionesNumericas.map(({ calificacion }) => calificacion), // Usar las calificaciones
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                        ],
                    };

                    return (
                        <div key={alumno.id} style={{
                            border: '1px solid #ddd',
                            padding: '20px',
                            borderRadius: '8px',
                            margin: '10px',
                            width: '300px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                        }}>
                            <p><strong>ID:</strong> {alumno.id}</p>
                            <p><strong>Cuenta:</strong> {alumno.cuenta}</p>
                            <p><strong>Nombre:</strong> {alumno.nombre}</p>
                            <div style={{ width: '100%', height: '350px' }}> {/* Aumento la altura de la gráfica */}
                                <Bar data={chartData} options={{
                                    responsive: true,
                                    maintainAspectRatio: false, // Permite que el gráfico ajuste su tamaño
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: 10,
                                        },
                                    },
                                }} />
                            </div>
                            <p><strong>Promedio:</strong> {promedio}</p>
                            <button style={{
                                padding: '10px',
                                color: '#fff',
                                backgroundColor: promedio === 'No Disponible' 
                                    ? '#F44336' 
                                    : (promedio >= 7 ? '#4CAF50' : '#F44336'), // Color verde para aprobado, rojo para reprobado
                                border: 'none',
                                borderRadius: '5px',
                                marginTop: '10px',
                            }}>
                                {promedio === 'No Disponible' 
                                    ? 'Sin Calificaciones' 
                                    : (promedio >= 7 ? 'Aprobado' : 'Reprobado')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calificaciones;
