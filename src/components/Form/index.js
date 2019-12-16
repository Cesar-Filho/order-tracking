import React, { useState } from 'react';
import styles from './Form.module.css';
import { Form, Input, Button, Row, InputNumber, message } from 'antd';
import history from '../../config/history';

function FormComponent({ fields, form, title, onSubmit }) {
    const [state, setState] = useState({});
    const { getFieldDecorator, resetFields } = form;

    return (
        <Form>
            <Row>
                <h1>{title}</h1>
            </Row>
            {fields.map(field => (
                <Form.Item label={field.label} key={field.name}>
                    {getFieldDecorator(field.name, {
                        rules: [
                            {
                                required: field.required || false,
                                message: `Please input your ${field.name}!`,
                            },
                            {
                                validator: form => field.validator(form),
                            },
                        ],
                    })(renderInput(field))}
                </Form.Item>
            ))}
            <Row className={styles.area_btn}>
                <Button className={styles.btn} type="danger" onClick={() => history.goBack()}>
                    Voltar
                </Button>
                <Button
                    className={styles.btn}
                    onClick={() => {
                        setState({});
                        resetFields();
                    }}
                >
                    Limpar
                </Button>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={() => {
                        console.log(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(state.cpf));
                        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(state.cpf)) {
                            return message.error(
                                'CPF Inválido, por favor informe um seguido o exemplo. ex: 000.000.000-00'
                            );
                        }

                        if (!state.clientName || state.clientName.trim() === '') {
                            return message.error('Informe o nome do cliente.');
                        }

                        if (!state.description || state.description.trim() === '') {
                            return message.error('Informe a descrição do pedido.');
                        }

                        onSubmit(state);
                    }}
                >
                    Gravar
                </Button>
            </Row>
        </Form>
    );

    function renderInput(field) {
        const { TextArea } = Input;

        if (field.type === 'number') return <InputNumber {...field} onChange={handleChange} />;
        if (field.type === 'area') return <TextArea onChange={handleChange} rows={4} {...field} />;
        return <Input {...field} onChange={handleChange} />;
    }

    function handleChange(ev) {
        ev.preventDefault();
        setState({ ...state, [ev.target.name]: ev.target.value });
    }
}

export default Form.create({ name: 'form' })(FormComponent);
