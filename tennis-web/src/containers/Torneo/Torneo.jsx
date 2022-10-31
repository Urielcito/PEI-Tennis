import React, { useEffect, useState } from 'react';
import Typography from '../../components/Typography/Typography';
import TorneoModal from '../../components/Modals/TorneoModal';
import { Button } from 'react-bootstrap';
import httpClient from '../../lib/httpClient';

const partidoInit = {
  fechaComienzo: '',
  estado: 'NO_INICIADO',
  jugadorLocal: {
    id: -1,
  },
  jugadorVisitante: {
    id: -1,
  },
  cancha: {
    id: -1,
  },
};

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

const Torneo = () => {
  const [partidosList, setPartidosList] = useState([]);
  const [listaJugadores, setListaJugadores] = useState([]);
  const [listaCanchas, setListaCanchas] = useState([]);
  const [partidoDataA, setPartidoDataA] = useState(partidoInit);
  const [partidoDataB, setPartidoDataB] = useState(partidoInit);
  const [isEdit, setIsEdit] = useState(false);
  const [hasErrorInForm, setHasErrorInForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(async () => {
    await getPartidos();
    await getJugadores();
    await getCanchas();
  }, []);

  // Functions

  //Verbos

  const getPartidos = async () => {
    try {
      const data = await httpClient.get('/partidos');
      data.map((partido) => {
        partido.fechaComienzo = new Date (partido.fechaComienzo).toLocaleDateString('es-AR', dateOptions);
        return partido;
      });
      setPartidosList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJugadores = async () => {
    try {
      const data = await httpClient.get('/jugadores');
      setListaJugadores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCanchas = async () => {
    try {
      const data = await httpClient.get('/canchas');
      setListaCanchas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarPartidos = async () => { // Hice re distinto el requerimiento, recien lo leo bien
    try {
      const dataSendA = {... partidoDataA};
      dataSendA.fechaComienzo = stringToDate(dataSendA.fechaComienzo);
      const dataA = await httpClient.post('/partidos', { data: dataSendA });
      dataA.fechaComienzo = new Date (dataA.fechaComienzo).toLocaleDateString('es-AR', dateOptions);

      const dataSendB = {... partidoDataB};
      dataSendB.fechaComienzo = dataSendA.fechaComienzo;
      const dataB = await httpClient.post('/partidos', { data: dataSendB });
      dataB.fechaComienzo = new Date (dataB.fechaComienzo).toLocaleDateString('es-AR', dateOptions);
      
      setPartidosList([...partidosList, dataA]);
      setPartidosList([...partidosList, dataB]);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const editarPartido = async (id) => {
    try {
      const dataSend = {...partidoDataA};
      dataSend.fechaComienzo = stringToDate(dataSend.fechaComienzo);
      const data = await httpClient.put(`/partidos/${id}`, { data: dataSend });
      data.fechaComienzo = new Date (data.fechaComienzo).toLocaleDateString('es-AR', dateOptions);
      setPartidosList(partidosList.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const borrarPartido = async (id) => {
    try {
      await httpClient.delete(`/partidos/${id}`, { data: partidoDataA });
      setPartidosList(partidosList.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const iniciarPartido = async(id) => {
    const partido = partidosList.filter(element => element.id === id);
    if(partido[0].estado === 'NO_INICIADO'){
      try{
        await httpClient.put(`/partidos/${id}/actions/init`);
      }
      catch(error){
        console.log(error);
      }
    }
  }

  function compararPuntos(a, b) {
    if (a.puntos < b.puntos) { return -1; }
    if (a.puntos > b.puntos) { return 1; }
    return 0;
  }
  //Usar esta funcion para ordenar los jugadres por ranking en partidoDataA y partidoDataB.
  const ordenarJugadores = () =>{
    const partidoA = {...partidoDataA};
    const partidoB = {...partidoDataB};

    const jugadorLA = partidoA.jugadorLocal;
    const jugadorVA = partidoA.jugadorVisitante;

    const jugadorLB = partidoB.jugadorLocal;
    const jugadorVB = partidoB.jugadorVisitante;

    const jugadores = [jugadorLA, jugadorVA, jugadorLB, jugadorVB];
    jugadores.sort(
      (j1, j2) => (j1.puntos < j2.puntos) ? 1 : (j1.puntos > j2.puntos) ? -1 : 0);
    partidoDataA.jugadorLocal = jugadores[0];
    partidoDataA.jugadorVisitante = jugadores[3];
    partidoDataB.jugadorLocal = jugadores[1];
    partidoDataB.jugadorVisitante = jugadores[2];
  }
  //Usar esta funcion para convertir el string 'fechaComienzo' a Date
  const stringToDate = (dateString) => {
    try {
      const [fecha, hora] = dateString.split(' ');
      const [dd, mm, yyyy] = fecha.split('/');
      if (hora !== undefined) {
        if (hora.includes(':')) {
          const [hh, mins] = hora.split(':');
          return new Date(yyyy, mm - 1, dd, hh, mins);
        }
      }
      return new Date(yyyy, mm - 1, dd);
    } catch (err) {
      console.log(`stringToDate error formateando la fecha: ${err}`);
      return null;
    }
  };

  const validatePartido = () => {
    if (partidoDataA.jugadorLocal.id === partidoDataA.jugadorVisitante.id || partidoDataB.jugadorLocal.id === partidoDataB.jugadorVisitante.id ) {
      setErrorMsg('Los jugadores local y visitante no pueden ser iguales');
      return false;
    }
    if (partidoDataA.jugadorLocal.id === partidoDataB.jugadorLocal.id || partidoDataA.jugadorLocal.id === partidoDataB.jugadorVisitante.id || partidoDataA.jugadorVisitante.id === partidoDataB.jugadorLocal.id || partidoDataA.jugadorVisitante.id === partidoDataB.jugadorVisitante.id){
      setErrorMsg('No pueden repetirse jugadores en el torneo.');
      return false;
    }
    const date = stringToDate(partidoDataA.fechaComienzo);

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      setErrorMsg('El formato de la fecha/hora de inicio no es válido');
      return false;
    }

    if (date < new Date(Date.now())) {
      setErrorMsg('La fecha/hora de inicio debe ser mayor o igual a la fecha/hora actual');
      return false;
    }

    if (validateCancha().length) {
      setErrorMsg('El partido no puede jugarse en la misma cancha dentro de un intervalo de 4 horas');
      return false;
    }

    return true;
  };

  const validateCancha = () => {
    const canchaId = partidoDataA.cancha.id;
    const fechaComienzo = stringToDate(partidoDataA.fechaComienzo);
    const fechaAntes = new Date(new Date(fechaComienzo).setHours(fechaComienzo.getHours() - 4));
    const fechaDespues = new Date(new Date(fechaComienzo).setHours(fechaComienzo.getHours() + 4));
    let partidosPorCancha = partidosList.filter((item) => item.cancha.id === canchaId);
    if (isEdit) {
      partidosPorCancha = partidosPorCancha.filter((item) => item.id !== partidoDataA.id);
    }
    return  partidosPorCancha.filter((item) => new Date(stringToDate(item.fechaComienzo)) > fechaAntes && new Date(stringToDate(item.fechaComienzo)) < fechaDespues);
  };
  // Modal
  const handleOpenModal = (editarPartido = false, partidoToEdit = null) => {
    setIsEdit(editarPartido);

    if (editarPartido) {
      setPartidoDataA(partidoToEdit);
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setHasErrorInForm(false);
    setPartidoDataA(partidoInit);
    setPartidoDataB(partidoInit);
    setErrorMsg('');
  };

  // Form
  const handleChangeInputForm = (property, value) => {
    value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);

    const newDataA = { ...partidoDataA };

    switch (property) {
      case 'jugadorLocalA':
        newDataA.jugadorLocal = listaJugadores.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'jugadorVisitanteA':
        newDataA.jugadorVisitante = listaJugadores.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'canchaA':
        newDataA.cancha = listaCanchas.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'fechaComienzoA':
        newDataA.fechaComienzo = value;
        break;
      default:
        break;
    }
    const newDataB = { ...partidoDataB };

    switch (property) {
      case 'jugadorLocalB':
        newDataB.jugadorLocal = listaJugadores.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'jugadorVisitanteB':
        newDataB.jugadorVisitante = listaJugadores.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'canchaB':
        newDataB.cancha = listaCanchas.filter((x) => x.id === parseInt(value))[0];
        break;
      case 'fechaComienzoB':
        newDataB.fechaComienzo = value;
        break;
      default:
        break;
    }

    setPartidoDataA(newDataA);
    setPartidoDataB(newDataB);
  };

  const handleSubmitForm = (e, form, isEdit) => {
    e.preventDefault();
    setHasErrorInForm(true);

    if (!validatePartido()) return;

    ordenarJugadores();

    if (form.checkValidity()) isEdit ? editarPartido(partidoDataA.id) : agregarPartidos();
    
  };

  return (
    <>
      <Typography id={'title-id'}>Torneo</Typography>
      <div className='mb-2'>
        <Button variant='success' onClick={() => handleOpenModal()}>Generar torneo</Button>
      </div>
      <TorneoModal
        show={openModal}
        onHide={handleCloseModal}
        isEdit={isEdit}
        handleChange={handleChangeInputForm}
        validated={hasErrorInForm}
        handleSubmit={handleSubmitForm}
        errorMsg={errorMsg}
        partidoA={partidoDataA}
        partidoB={partidoDataB}
        listaJugadores={listaJugadores}
        listaCanchas={listaCanchas}
      />
    </>
  );
};

export default Torneo;
