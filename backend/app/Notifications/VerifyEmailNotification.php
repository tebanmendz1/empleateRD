<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail
{
    public function toMail($notifiable): MailMessage
    {
        $url = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Confirma tu correo en EmpléateRD')
            ->greeting('Hola, '.$notifiable->name)
            ->line('Gracias por crear tu cuenta en EmpléateRD, la plataforma que conecta talento y empresas en República Dominicana.')
            ->line('Confirma que esta dirección de correo te pertenece para proteger tu cuenta y habilitar todas sus funciones.')
            ->action('Confirmar mi correo', $url)
            ->line('El enlace estará disponible durante 60 minutos. Si no creaste esta cuenta, puedes ignorar este mensaje.')
            ->salutation('Equipo de EmpléateRD');
    }
}
