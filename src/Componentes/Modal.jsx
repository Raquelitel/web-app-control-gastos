import React, { useEffect, useState } from 'react'
import Mensaje from './Mensaje.jsx'
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal,guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [id, setId] = useState("")
    const [fecha, setFecha] = useState("")

    useEffect(() => {
        if(Object.keys(gastoEditar).length >0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(()=> {
            setModal(false)
        }, 300)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios")
            return;

            setTimeout(() => {
                setMensaje("")
            },2000);
        };
        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
            src={CerrarBtn}
            alt="icono cerrar"
            onClick={ocultarModal}
        />
      </div>
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        <div className='campo'>
            <label htmlFor='nombre'>Nombre del Gasto</label>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <input
                id="nombre"
                type="text"
                placeholder='Añade el nombre del gasto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input
                id="cantidad"
                type="number"
                placeholder='Añade la cantidad. ej: 200'
                value={cantidad}
                onChange= {e => setCantidad(Number(e.target.value))}
            />
        </div>

        <div className='campo'>
            <label htmlFor='categoria'>Categoría</label>
            <select
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="ocio">Ocio</option>
                <option value="gastos">Gastos varios</option>
            </select>
        </div>

        <input 
            type="submit"
            value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />

      </form>
    </div>
  )
}

export default Modal
