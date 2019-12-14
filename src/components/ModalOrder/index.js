import React from 'react';
import { Modal } from 'antd';
import { formatDistance, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function ModalOrder({ order, visible, setVisible, setItemVisible }) {
    if (!order.createdAt) return null;
    return (
        <Modal
            title="Detalhe do pedido"
            visible={visible}
            onOk={() => {
                setItemVisible({});
                setVisible(false);
            }}
            onCancel={() => {
                setItemVisible({});
                setVisible(false);
            }}
        >
            <p>
                <strong>Cliente:</strong> {order.clientName}
            </p>
            <p>
                <strong>CPF:</strong> {order.cpf}
            </p>
            <p>
                <strong>Status:</strong> {order.status}
            </p>
            <p>
                <strong>Descrição:</strong> {order.description}
            </p>
            <p>
                <strong>Tempo de espera:</strong>{' '}
                {formatDistance(parseISO(order.createdAt), order.readedAt ? parseISO(order.readedAt) : new Date(), {
                    locale: pt,
                })}
            </p>
        </Modal>
    );
}
