import React from 'react'
import { useDispatch } from 'react-redux'
import { Card } from 'antd'

import FormComponent from '../../components/Form'
import styles from './OrderForm.module.css'
import { getAll } from '../../store/orders'

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
        onSubmit={data => {
          dispatch(getAll())
        }}
      />
    </Card>
  )
}
