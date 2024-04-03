import { ReactNode } from "react";

interface NotificationAlertRoot {
    children: ReactNode
}

export default function NotificationAlertRoot({children}: NotificationAlertRoot) {
 return (
   <div>
    {children}
   </div>
 );
}