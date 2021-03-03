import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Versión Tabla',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Versión Recibos',
    path: '/recibos',
    icon: <FaIcons.FaMoneyBillAlt />,
    cName: 'nav-text'
  }
];