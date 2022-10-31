import React, { useEffect, useState } from 'react';
import Typography from '../../components/Typography/Typography';
import { Button } from 'react-bootstrap';
import TableEntrenadores from '../../components/Tables/TableEntrenadores.jsx';
import EntrenadorModal from '../../components/Modals/EntrenadorModal';
import httpClient from '../../lib/httpClient';

const entrenadorInit = {
  nombre: '',
}

const Entrenador = () => {
  const[entrenadoresList, setEntrenadoresList] = useState([]);
  const[entrenadorData, setEntrenadorData] = useState(entrenadorInit);
  const[isEdit, setIsEdit] = useState(false);
  const [hasErrorInForm, setHasErrorInForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

useEffect(async()=>{
  await getEntrenadores();
}, [])

//Verbos
const getEntrenadores = async() => {
  try {
    const data = await httpClient.get('/entrenadores');
    setEntrenadoresList(data);
  }catch(error){
    console.log(error);
  }
};

const agregarEntrenador = async () => {
  try {
    const data = await httpClient.post(`/entrenadores`, { data: entrenadorData });
    setEntrenadoresList([...entrenadoresList, data]);
  } catch (error) {
    console.log(error);
  }
  handleCloseModal();
};

const editarEntrenador = async (id) => {
  try {
    const data = await httpClient.put(`/entrenadores/${id}`, { data: entrenadorData });
    setEntrenadoresList(entrenadoresList.map((item) => (item.id === id ? data : item)));
  } catch (error) {
    console.log(error);
  }
  handleCloseModal();
};

const borrarEntrenador = async (id) => {
  try {
    await httpClient.delete(`/entrenadores/${id}`);
    setEntrenadoresList(entrenadoresList.filter((entrenador) => entrenador.id !== id));
  } catch (error) {
    console.log(error);
  }
};

// Buttons
const handleDetail = (data, event) => {
  event.preventDefault();
  props.history.push(`/entrenadores/detalle/${data.id}`, { data });
};
const handleEdit = (editData, event) => {
  event.preventDefault();
  handleOpenModal(true, editData);
};
const handleDelete = async (id, event) => {
  event.preventDefault();
  if (window.confirm('Estas seguro?')) {
    await borrarEntrenador(id);
  }
};

// Modal
const handleOpenModal = (editarEntrenador = false, entrenadorToEdit = null) => {
  setIsEdit(editarEntrenador);

  if (editarEntrenador) {
    setEntrenadorData(entrenadorToEdit);
  }

  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setIsEdit(false);
  setHasErrorInForm(false);
  setEntrenadorData(entrenadorInit);
  setErrorMsg('');
};

// Form
const handleChangeInputForm = (property, value) => {
  // Si el valor del input es vacío, entonces setea que hay un error
  value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);

  setEntrenadorData({ ...entrenadorData, [property]: value });
};

const handleSubmitForm = (e, form, isEdit) => {
  e.preventDefault();
  setHasErrorInForm(true);

  if (form.checkValidity()) isEdit ? editarEntrenador(entrenadorData.id) : agregarEntrenador();
};

// API

return (
  <>
    <Typography id={'title-id'}>Entrenador</Typography>
    <div className="mb-2">
      <Button variant="success" onClick={() => handleOpenModal()}>Agregar entrenador</Button>
    </div>

    <TableEntrenadores
      dataForTable={entrenadoresList}
      detail={handleDetail}
      edit={handleEdit}
      delete={(id, event) => handleDelete(id, event)}
    />
    <EntrenadorModal
      show={openModal}
      onHide={handleCloseModal}
      isEdit={isEdit}
      handleChange={handleChangeInputForm}
      entrenador={entrenadorData}
      validated={hasErrorInForm}
      handleSubmit={handleSubmitForm}
      errorMsg={errorMsg}
    />
  </>
);
};

export default Entrenador;

