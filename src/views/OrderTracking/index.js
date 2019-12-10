import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { getAll } from '../../store/orders';
import Badge from '../../components/Badge';

export default function OrderTracking() {
  const { list } = useSelector(state => state.order);
  const [state, setState] = useState(list);
  const dispatch = useDispatch();

  const columns = [
    { title: 'Cliente', dataIndex: 'clientName', key: 'client' },
    { title: 'Tempo de espera', dataIndex: 'waitingTime', key: 'waitingTime' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: type => <Badge type={type} /> }
  ];

  useEffect(() => dispatch(getAll()), [dispatch]);
  useEffect(() => {
    const data = list.filter(l => !(l.status === 'PAGO' || l.status === 'EXCLUIDO'));
    setState(
      data.map(l => ({
        ...l,
        key: l.id,
        clientName: l.clientName,
        waitingTime: formatDistanceToNow(parseISO(l.createdAt), { locale: pt }),
        status: l.status
      }))
    );
  }, [list]);

  return (
    <div style={{ margin: 40 }}>
      <Table
        bordered
        title={() => <h2>Acompanhamento de pedidos</h2>}
        columns={columns}
        dataSource={state}
        footer={() => (
          <span>
            <strong>ATENÇÃO:</strong> Dirija-se ao caixa quando seu pedido estiver azul
          </span>
        )}
      />
      <h3>Legenda</h3>
      <div style={{ display: 'block' }}>
        <Badge type="novo" />
        <span>Pedido novo</span>
      </div>

      <Badge type="preparando" />
      <span>Pedido sendo preparado</span>
      <Badge type="conferencia" />
      <span>Pedido em conferência</span>
      <Badge type="pronto" />
      <span>Pronto para pagamento</span>
    </div>
  );
}
