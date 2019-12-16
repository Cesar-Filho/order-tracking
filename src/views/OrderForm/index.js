import React from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';

import { save } from '../../store/orders';
import FormComponent from '../../components/Form';

export default function OrderForm() {
    const dispatch = useDispatch();

    return (
        <Card>
            <FormComponent
                title="Cadastro de pedidos"
                fields={[
                    { placeholder: 'Nome do Cliente', name: 'clientName' },
                    { placeholder: 'CPF', name: 'cpf', type: 'cpf' },
                    { placeholder: 'Descrição', name: 'description', type: 'area' },
                ]}
                onSubmit={data => dispatch(save({ ...data, status: 'NOVO' }))}
            />
        </Card>
    );
}
