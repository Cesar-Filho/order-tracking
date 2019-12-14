import React from 'react';
import { Button } from 'antd';

export default function ActionsOrder({ item, showItem, nextItem, deleteItem }) {
    return (
        <>
            <Button onClick={showItem} style={{ margin: '0 5px 0 5px' }} size="large" shape="circle" icon="rise" />
            <Button
                onClick={nextItem}
                style={{ margin: '0 5px 0 5px' }}
                disabled={item.status === 'PRONTO' ? true : false}
                shape="circle"
                type="primary"
                icon="forward"
                size="large"
            />
            <Button
                onClick={deleteItem}
                style={{ margin: '0 5px 0 5px' }}
                shape="circle"
                type="danger"
                icon="close"
                size="large"
            />
        </>
    );
}
