import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';

import Badge from '../../components/Badge';
import Legends from '../../components/Legends';
import ModalOrder from '../../components/ModalOrder';
import ActionsOrder from '../../components/ActionsOrder';
import { getAll, deleted, next } from '../../store/orders';

export default function OrderTracking() {
    const { list } = useSelector(state => state.order);
    const [visible, setVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState({});
    const dispatch = useDispatch();

    const state = useMemo(() => {
        const data = list.filter(l => !(l.status === 'PAGO' || l.status === 'EXCLUIDO'));

        return data.map(l => ({ ...l, key: l.id, actions: l })).sort((a, b) => a.id - b.id);
    }, [list]);

    useEffect(() => dispatch(getAll()), [dispatch]);

    const columns = [
        { title: 'Cliente', dataIndex: 'clientName', key: 'client' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '200px',
            render: type => <Badge type={type} />,
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            width: '200px',
            render: item => (
                <ActionsOrder
                    item={item}
                    nextItem={() => dispatch(next(item))}
                    deleteItem={() => dispatch(deleted(item))}
                    showItem={() => {
                        setItemVisible(item);
                        setVisible(!visible);
                    }}
                />
            ),
        },
    ];

    return (
        <>
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
            <ModalOrder order={itemVisible} visible={visible} setItemVisible={setItemVisible} setVisible={setVisible} />
        </>
    );
}
