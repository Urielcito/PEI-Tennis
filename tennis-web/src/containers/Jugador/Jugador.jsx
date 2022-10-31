import React, { useEffect, useState } from 'react';
import Typography from '../../components/Typography/Typography';
import { Button } from 'react-bootstrap';
import TableJugadores from '../../components/Tables/TableJugadores';
import JugadorModal from '../../components/Modals/JugadorModal';
import httpClient from '../../lib/httpClient';

let jugadorInit = {
  nombre: '',
  puntos: 0,
  entrenador: {
    id: -1,
  },
};

const Jugador = (props) => {
  const [jugadoresList, setJugadoresList] = useState([]);
  const [jugadorData, setJugadorData] = useState(jugadorInit);
  const [listaEntrenadores, setListaEntrenadores] = useState([]);
  const [partidosList, setPartidosList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [hasErrorInForm, setHasErrorInForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  useEffect(async () => {
    await getJugadores();
    await getEntrenadores();
    await getPartidos();
  }, []);

  //Verbos
  const getJugadores = async () => {
    try {
      const data = await httpClient.get('/jugadores');
      setJugadoresList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntrenadores = async () => {
    try {
      const data = await httpClient.get('/entrenadores');
      setListaEntrenadores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPartidos = async () => {
    try {
      const data = await httpClient.get('/partidos');
      setPartidosList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarJugador = async () => {
    try {
      const data = await httpClient.post(`/jugadores`, { data: jugadorData });
      setJugadoresList([...jugadoresList, data]);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const editarJugador = async (id) => {
    try {
      const data = await httpClient.put(`/jugadores/${id}`, { data: jugadorData });
      setJugadoresList(jugadoresList.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const borrarJugador = async (id) => {
    try {
      await httpClient.delete(`/jugadores/${id}`);
      setJugadoresList(jugadoresList.filter((jugador) => jugador.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const calcularGanancia = (id) => {
    const partidos = [...partidosList]; 
    const mayorA3 = 300;
    const menorA3 = 200;
    let ganancia = 0;
    partidos.forEach(element => {
      if((element.jugadorLocal.id === id && element.cantidadGamesLocal === 6)||(element.jugadorVisitante.id === id && element.cantidadGamesVisitante === 6)){
        let diff = Math.abs(element.cantidadGamesLocal - element.cantidadGamesVisitante);
        if(diff>3)
        {
          ganancia+=mayorA3;
        }
        else
        {
          ganancia+=menorA3;
        }
      }
    })
    return ganancia;
  }

  // Buttons
  const handleDetail = (data, event) => {
    event.preventDefault();
    props.history.push(`/jugador/detalle/${data.id}`, { data });
  };

  const handleEdit = (editData, event) => {
    event.preventDefault();
    handleOpenModal(true, editData);
  };
  const handleDelete = async (id, event) => {
    event.preventDefault();
    if (window.confirm('Estas seguro?')) {
      await borrarJugador(id);
    }
  };

  const handleRecalculateRanking = async (id, event) => {
    event.preventDefault();
    await httpClient.put(`/jugadores/${id}/actions/recalculateRanking`);
    const data = await httpClient.get(`/jugadores/${id}`);
    setJugadoresList(jugadoresList.map((item) => (item.id === id ? data : item)));
  };

  // Modal
  const handleOpenModal = (editarJugador = false, jugadorToEdit = null) => {
    setIsEdit(editarJugador);

    if (editarJugador) {
      setJugadorData(jugadorToEdit);
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setHasErrorInForm(false);
    setJugadorData(jugadorInit);
    setErrorMsg('');
  };

  // Form
  const handleChangeInputForm = (property, value) => {
    // Si el valor del input es vacío, entonces setea que hay un error
    value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);
    const newData = { ...jugadorData};

    switch(property){
      case 'nombre':
        newData.nombre = value;
        break;
      case 'puntos':
        newData.puntos = value;
      break;
      case 'entrenador':
        newData.entrenador = listaEntrenadores.filter((x) => x.id === parseInt(value))[0];
        break;
    }
    setJugadorData(newData);
  };

  const handleSubmitForm = (e, form, isEdit) => {
    e.preventDefault();
    setHasErrorInForm(true);

    if (form.checkValidity()) isEdit ? editarJugador(jugadorData.id) : agregarJugador();
  };

  // API

  return (
    <>
      <Typography id={'title-id'}>Jugador</Typography>
      <div className="mb-2">
        <Button variant="success" onClick={() => handleOpenModal()}>Agregar jugador</Button>
      </div>

      <TableJugadores
        dataForTable={jugadoresList}
        detail={handleDetail}
        edit={handleEdit}
        delete={(id, event) => handleDelete(id, event)}
        recalcularRanking={handleRecalculateRanking}
        calcularGanancia={calcularGanancia}
      />
      <JugadorModal
        show={openModal}
        onHide={handleCloseModal}
        isEdit={isEdit}
        handleChange={handleChangeInputForm}
        jugador={jugadorData}
        validated={hasErrorInForm}
        handleSubmit={handleSubmitForm}
        errorMsg={errorMsg}
        listaEntrenadores={listaEntrenadores}
      />
    </>
  );
};

export default Jugador;
