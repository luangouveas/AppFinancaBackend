import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { Fragment, ReactNode } from 'react'

interface NotificationAlertBodyProps {
    notificationAlertInit: boolean;
    children: ReactNode[];
} 

export default function NotificationAlertBody({notificationAlertInit, children}: NotificationAlertBodyProps) {
    const notificationAlertOnclose = () => {
        console.log('asasas')
    }

 return (
    <Transition.Root show={notificationAlertInit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={notificationAlertOnclose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col w-full">
                        {children[0]}
                        </div>
                    </div>
                </div>
                {children[1]}
            </Dialog.Panel>  
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition.Root>
 );
}