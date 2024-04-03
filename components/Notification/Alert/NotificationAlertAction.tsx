import { ButtonHTMLAttributes } from "react";

interface NotificationAlertActionProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  text: string;
}

export default function NotificationAlertAction({text, ...rest}:NotificationAlertActionProps) {
 return (
      <button type="button" {...rest} >
        {text}
      </button>
 );
}