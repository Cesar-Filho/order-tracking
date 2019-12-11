import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import Badge from '../../components/Badge';
import Legends from '../../components/Legends';
import { getAll, deleted, next } from '../../store/orders';

export default function OrderTracking() {
    const { list } = useSelector(state => state.order);
    const [visible, setVisible] = useState(false)
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
                        <Button onClick={() => setVisible(!visible)} style={{ margin: '0 5px 0 5px' }} size="large" shape="circle" icon="rise" />
                        <Button onClick={() => dispatch(next(item))} style={{ margin: '0 5px 0 5px' }} shape="circle" type="primary" icon="forward" size="large" />
                        <Button onClick={() => dispatch(deleted(item))} style={{ margin: '0 5px 0 5px' }} shape="circle" type="danger" icon="close" size="large" />
                        <Modal
                            title="Detalhe do pedido"
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                        >
                            <p><strong>Cliente:</strong> {item.clientName}</p>
                            <p><strong>CPF:</strong> {item.cpf}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Descrição:</strong> {item.description}</p>
                            <p><strong>Tempo de espera:</strong> {formatDistance(parseISO(item.createdAt), item.readedAt ? parseISO(item.readedAt) : new Date(), { locale: pt })}</p>
                        </Modal>
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
            actions: l
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
