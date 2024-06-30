import React from 'react';
import ReactLoading from 'react-loading';
import styles from './WineGlassLoading.module.css';

const Loading: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <ReactLoading type="spinningBubbles" color="#720e2a" height={100} width={100} />
        </div>
    );
};

export default Loading;
