import React, { useEffect, useMemo } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { getAll } from '../../store/orders';
import Badge from '../../components/Badge';
import Legends from '../../components/Legends';

export default function OrderTracking() {
    const { list } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const columns = [
        { title: 'Cliente', dataIndex: 'clientName', key: 'client' },
        { title: 'Tempo de espera', dataIndex: 'waitingTime', key: 'waitingTime' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: type => <Badge type={type} /> },
    ];

    const state = useMemo(() => {
        const data = list.filter(l => !(l.status === 'PAGO' || l.status === 'EXCLUIDO'));

        return data
            .map(l => ({
                ...l,
                key: l.id,
                clientName: l.clientName,
                waitingTime: formatDistance(parseISO(l.createdAt), l.readedAt ? parseISO(l.readedAt) : new Date(), {
                    locale: pt,
                }),
                status: l.status,
            }))
            .sort((a, b) => a.id - b.id);
    }, [list]);

    useEffect(() => dispatch(getAll()), [dispatch]);

    return (
        <>
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
            <Legends />
        </>
    );
}
