import React from 'react'
import { Card } from 'antd'
import { useDispatch } from 'react-redux'

import { save } from '../../store/orders'
import FormComponent from '../../components/Form'

import styles from './OrderForm.module.css'

export default function OrderForm() {
  const dispatch = useDispatch()

  return (
    <Card className={styles.card}>
      <FormComponent
        title="Cadastro de pedidos"
        fields={[
          { placeholder: 'Nome do Cliente', name: 'clientName' },
          { placeholder: 'CPF', name: 'cpf' },
          { placeholder: 'Descrição', name: 'description', type: 'area' }
        ]}
        onSubmit={data => dispatch(save(data))}
      />
    </Card>
  )
}
