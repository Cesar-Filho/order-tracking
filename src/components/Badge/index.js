import React from 'react';

import styles from './Badge.module.css';

export default function Badge({ type }) {
  return (
    <div
      title={type.toUpperCase()}
      className={`${styles.status} ${type ? styles[type.toLowerCase()] : styles.nocolor}`}
    />
  );
}
