import React from 'react';
import { Popover } from '@headlessui/react';

export default function PopoverCreate({ button, header, body }) {
  return (
    <Popover className="relative">
      <Popover.Button className="">
        {button}
      </Popover.Button>
      <Popover.Panel className="z-50 w-80 absolute left-1/2 mt-3 max-w-sm -translate-y-3 -translate-x-8 transform px-2 sm:px-0 lg:max-w-3xl">
        <div className="w-0 h-0 border-8 border-solid border-transparent border-b-gray-600 relative -top-0 left-6" />
        <div className="inline-block w-64 text-sm font-light text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex flex-row place-content-between px-3 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            {header}
          </div>
          <div className="relative grid gap-8 p-3 lg:grid-cols-2 ">
            {body}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
