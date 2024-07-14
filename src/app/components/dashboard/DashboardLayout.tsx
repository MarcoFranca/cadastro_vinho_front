import React from 'react';
import styles from './DashboardLayout.module.css';
import AsideHeader from "@/app/components/header/aside/AsideHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            <AsideHeader />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
