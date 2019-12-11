import React from 'react';

import Badge from '../../components/Badge';

import styles from './Legends.module.css';

export default function Legends() {
  return (
    <>
      <h3>Legenda</h3>
      <div className={styles.legends}>
        <Badge type="novo" />
        <strong className={styles.legends_title}>Pedido novo</strong>
      </div>
      <div className={styles.legends}>
        <Badge type="preparando" />
        <strong className={styles.legends_title}>Pedido sendo preparado</strong>
      </div>
      <div className={styles.legends}>
        <Badge type="conferencia" />
        <strong className={styles.legends_title}>Pedido em conferência</strong>
      </div>
      <div className={styles.legends}>
        <Badge type="pronto" />
        <strong className={styles.legends_title}>Pronto para pagamento</strong>
      </div>
    </>
  );
}
