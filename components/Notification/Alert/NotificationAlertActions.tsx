import { ReactNode } from "react"

interface NotificationAlertActionsProps {
    children: ReactNode
}

export default function NotificationAlertActions({children}:NotificationAlertActionsProps) {
 return (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
        {children}
    </div>
 );
}