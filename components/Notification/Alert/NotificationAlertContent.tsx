import { Dialog } from "@headlessui/react";

interface NotificationAlertContentProps {
    title:string;
    description: string;
}

export default function NotificationAlertContent({title, description}: NotificationAlertContentProps) {
 return (
    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            {title}
        </Dialog.Title>
        <div className="mt-2">
            <p className="text-sm text-gray-500">
                {description}
            </p>
        </div>
    </div>
 );
}