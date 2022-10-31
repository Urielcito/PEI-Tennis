import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import FormRowInput from '../FormRow/FormRowInput';
import FormRowSelect from '../FormRow/FormRowSelect';


const PartidoModal = (props) => {
  const formRef = useRef(null);
  const {
    show,
    onHide,
    isEdit,
    handleChange,
    partidoA,
    partidoB,
    listaJugadores,
    listaCanchas,
    validated,
    handleSubmit,
    errorMsg,
  } = props;

  const jugadores = listaJugadores.map((jugador) => {
    return (
      <option key={jugador.id} value={parseInt(jugador.id)}>
        {jugador.nombre}
      </option>
    );
  });

  const canchas = listaCanchas.map((cancha) => {
    return (
      <option key={cancha.id} value={parseInt(cancha.id)}>
        {cancha.nombre}
      </option>
    );
  });

  

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={true} //Centra el modal verticalmente en la pantalla
      backdrop="static" //Si se hace click fuera del modal este no se cerrara
      keyboard={false} //Si se presiona la tecla ESC tampoco se cierra
    >
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Editar' : 'Agregar'} Partido</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className={'form'} noValidate validated={validated} ref={formRef}>
          <FormRowInput
            label={'Fecha / Hora de inicio'}
            type={'text'}
            required={true}
            placeholder={'DD/MM/YYYY hh:mm'}
            value={partidoA.fechaComienzo}
            handleChange={handleChange}
            property={'fechaComienzoA'}
          />

          <FormRowSelect
            label={'Jugador 1'}
            required={true}
            placeholder={'Elige un jugador'}
            value={partidoA.jugadorLocal.id}
            handleChange={handleChange}
            property={'jugadorLocalA'}
            options={jugadores}
          />

          <FormRowSelect
            label={'Jugador 2'}
            required={true}
            placeholder={'Elige un jugador'}
            value={partidoA.jugadorVisitante.id}
            handleChange={handleChange}
            property={'jugadorVisitanteA'}
            options={jugadores}
          />
          
          <FormRowSelect
            label={'Jugador 3'}
            required={true}
            placeholder={'Elige un jugador'}
            value={partidoB.jugadorLocal.id}
            handleChange={handleChange}
            property={'jugadorLocalB'}
            options={jugadores}
          />

          <FormRowSelect
            label={'Jugador 4'}
            required={true}
            placeholder={'Elige un jugador'}
            value={partidoB.jugadorVisitante.id}
            handleChange={handleChange}
            property={'jugadorVisitanteB'}
            options={jugadores}
          />

          <FormRowSelect
            label={'Cancha'}
            required={true}
            placeholder={'Cancha para el primer partido'}
            value={partidoA.cancha.id}
            handleChange={handleChange}
            property={'canchaA'}
            options={canchas}
          />

          <FormRowSelect
            label={'Cancha'}
            required={true}
            placeholder={'Cancha para el segundo partido'}
            value={partidoB.cancha.id}
            handleChange={handleChange}
            property={'canchaB'}
            options={canchas}
          />

          {errorMsg !== '' && <Form.Group className="alert-danger">{errorMsg}</Form.Group>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Cancelar
        </Button>
        <Button onClick={(e) => handleSubmit(e, formRef.current, isEdit)} variant="success">
          {isEdit ? 'Editar' : 'Agregar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PartidoModal;
