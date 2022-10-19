/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';

// Part of the styles come from https://github.com/fireship-io/tailwind-dashboard/

function SideBarIcon({ icon, route, text = 'tooltip 💡' }) {
  return (
    <Link to={route}>
      <div className="relative flex items-center justify-center
    h-12 w-12 mt-2 mb-2 mx-auto
  bg-gray-400 hover:bg-green-600 dark:bg-gray-800
  text-green-500 hover:text-white
    hover:rounded-xl rounded-3xl
    transition-all duration-300 ease-linear
    cursor-pointer shadow-lg group"
      >
        {icon}
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    text-white bg-gray-900
    text-xs font-bold
    transition-all duration-100 scale-0 origin-left; group-hover:scale-100"
        >
          {text}
        </span>
      </div>
    </Link>
  );
}

function AdminSidebar() {
  return (
    <div className="fixed top-30 left-0 h-screen w-16 flex flex-col shadow-lg bg-white dark:bg-gray-900 shadow-lg" aria-label="Navegación de Admin">
      <SideBarIcon icon="📈" route="/admin" text="Métricas y actividad" />
      <SideBarIcon icon="👥" route="/admin/rrhh" text="RRHH" />
      <SideBarIcon icon="🏅" route="/admin/logros" text="Logros" />
      <SideBarIcon icon="⚙️" route="/admin/config" text="Configuración" />
    </div>
  );
}

export default AdminSidebar;
