import React, {useRef} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import FormRowInput from "../FormRow/FormRowInput";

const EntrenadorModal = (props) => {
    const formRef = useRef(null);
    const { show, onHide, isEdit, handleChange, entrenador, validated, handleSubmit, errorMsg } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered={true} //Centra el modal verticalmente en la pantalla
            backdrop="static" //Si se hace click fuera del modal este no se cerrara
            keyboard={false}  //Si se presiona la tecla ESC tampoco se cierra
        >
            <Modal.Header closeButton>
                <Modal.Title>{ isEdit ? 'Editar': 'Agregar' } Entrenador</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className={"form"} noValidate validated={validated} ref={formRef}>
                    <FormRowInput
                        label={'Nombre'}
                        type={'text'}
                        required={true}
                        placeholder={'Nombre del entrenador'}
                        property={'nombre'}
                        value={entrenador.nombre}
                        handleChange={handleChange}
                    />
                    {errorMsg !== '' &&
                        <Form.Group className="alert-danger">
                            {errorMsg}
                        </Form.Group>
                    }
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide} variant="danger">Cancelar</Button>
                <Button onClick={(e)=> handleSubmit(e,formRef.current, isEdit)} variant="success">{ isEdit ? 'Editar': 'Agregar' }</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EntrenadorModal;
