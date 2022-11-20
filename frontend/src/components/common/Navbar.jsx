import * as React from 'react';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import UserContext from '../../contexts/userContext';
import SwitchDark from './SwitchDark';

import { ReactComponent as Icono } from '../../assets/images/icono.svg';
import { isAdmin } from '../../utils/auth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const user = React.useContext(UserContext);

  const [navigation, setNavigation] = React.useState(
    [
      { name: 'Logros', href: '/logros', current: false },
      { name: 'Proyectos', href: '/proyectos', current: false },
      { name: 'Leaderboard', href: '/leaderboard', current: false },
      { name: 'Estatutos', href: '/estatutos', current: false },
    ],
  );

  // Update the current page state on navigation
  const location = useLocation();

  React.useEffect(() => {
    setNavigation((prev) => prev.map((item) => ({
      ...item,
      current: item.href === location.pathname,
    })));
  }, [location]);

  return (
    <Disclosure as="nav" className="bg-gray-800 z-50 min-w-full fixed top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex flex-row">
                    <Icono className="block h-9 w-auto mr-2" />
                    <span className="hidden lg:block self-center text-xl font-semibold whitespace-nowrap text-white mr-2">
                      Members OSUC
                      <span className="text-osuc-navyblue">.</span>
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SwitchDark />

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Abrir menú de usuario</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.profile?.avatarURL}
                        alt=""
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/perfil/${user?.username}`}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              👤 Tu perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/solicitudes/"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              📝 Solicitudes
                            </Link>
                          )}
                        </Menu.Item>
                        { isAdmin(user) && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/admin/"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              👨‍💻 Admin
                            </Link>
                          )}

                        </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/?logout=true"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              🚪 Cerrar sesión
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )
                  : (
                    <a
                      href={`${import.meta.env.VITE_BASE_API_URL}/auth/login`}
                      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mx-2"
                      title="Iniciar sesión"
                    >
                      <UserCircleIcon className="h-10 w-10 rounded-full text-osuc-white-3 bg-osuc-black-1" />
                    </a>
                  )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
