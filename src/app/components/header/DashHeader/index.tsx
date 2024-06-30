'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import { login } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/store/slices/authSlice';
import Image from 'next/image';
import FotoPerfil from '@/../public/assets/icones/usuarioLogin.svg';
import styles from './dashHeader.module.css';
import { useRouter } from 'next/navigation';

export default function DashHeader() {
 const [userData, setUserData] = useState<any>(null);
 const dispatch = useDispatch();
 const router = useRouter();


 useEffect(() => {
  const fetchUserData = async () => {
   try {
    const response = await axiosInstance.get('/users/profile/', {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
     },
    });
    const user = response.data;
    const token = response.data.access_token;
    dispatch(login({ user, token }));
    setUserData(user);
   } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
   }
  };

  fetchUserData().catch();
 }, [dispatch]);

 const handleLogout = () => {
  dispatch(logoutAction());
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/login');
 };


 if (!userData) {
  return <div>Carregando...</div>;
 }

 return (
     <div className={styles.container}>
      <Image src={FotoPerfil} alt={'imagem perfil'} className={styles.perfil} />
      <div className={styles.logout} onClick={handleLogout}>
       logout
      </div>
      <div className={styles.contain}>
       <h2>{userData.username}</h2>
       <p>{userData.email}</p>
      </div>
     </div>
 );
}
