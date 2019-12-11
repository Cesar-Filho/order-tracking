import React, { useEffect, useMemo } from 'react';
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { getAll } from '../../store/orders';
import Badge from '../../components/Badge';
import Legends from '../../components/Legends';

export default function OrderTracking() {
  const { list } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const columns = [
    { title: 'Cliente', dataIndex: 'clientName', key: 'client' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '200px',
      render: type => <Badge type={type} />
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: '200px',
      render: item => {
        return (
          <>
            <Button style={{ margin: '0 5px 0 5px' }} size="large" shape="circle" icon="rise" />
            <Button style={{ margin: '0 5px 0 5px' }} shape="circle" type="primary" icon="forward" size="large" />
            <Button style={{ margin: '0 5px 0 5px' }} shape="circle" type="danger" icon="close" size="large" />
          </>
        );
      }
    }
  ];

  const state = useMemo(() => {
    const data = list.filter(l => !(l.status === 'PAGO' || l.status === 'EXCLUIDO'));

    return data.map(l => ({
      ...l,
      key: l.id,
      clientName: l.clientName,
      status: l.status,
      item: l
    }));
  }, [list]);

  useEffect(() => dispatch(getAll()), [dispatch]);

  return (
    <div style={{ margin: 40 }}>
      <Table
        bordered
        title={() => <h2>Avançar status do pedido</h2>}
        columns={columns}
        dataSource={state}
        footer={() => (
          <span>
            <strong>ATENÇÃO:</strong> Dirija-se ao caixa quando seu pedido estiver azul
          </span>
        )}
      />
      <Legends />
    </div>
  );
}
