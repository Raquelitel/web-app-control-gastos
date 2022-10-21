import React, { useEffect, useState } from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

  const [porcentaje, setPorcentaje] =useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)


  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado

    //calcular porcentaje gastado
    const nuevoPorcentaje =(((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    
    setDisponible(totalDisponible)
    setGastado(totalGastado)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    },1500)

  }, [gastos])

  const formatearCantidad = cantidad => {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR"
    })
    return formatter.format(cantidad)
  }

  const handleResetApp = () => {
    const resultado = confirm("¿Seguro deseas reiniciar?");

    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <CircularProgressbar
      styles={buildStyles({
        pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
        trailColor: "#f5f5f5",
        textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
      })}
      value={porcentaje}
      text={`${porcentaje}% Gastado`}
      
      />

      <div className='contenido-presupuesto'>
        <button 
          className='reset-app'
          type='button'
          onClick={handleResetApp}
        >
          Resetear APP
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
