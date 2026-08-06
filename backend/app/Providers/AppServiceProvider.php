<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use App\Models\ApplicationMessage;
use App\Models\Interview;
use App\Models\TalentInvitation;
use App\Services\MultichannelNotifier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(fn (object $user, string $token): string => rtrim(config('app.frontend_url'), '/').'/restablecer?token='.$token.'&email='.urlencode($user->getEmailForPasswordReset()));
        TalentInvitation::created(function (TalentInvitation $invitation): void {app(MultichannelNotifier::class)->send($invitation->candidate,'talent_invitation','Nueva invitación laboral',$invitation->company->name.' te invitó a considerar '.$invitation->job->title.'.','/talento');});
        Interview::created(function (Interview $interview): void {$candidate=$interview->application->user;app(MultichannelNotifier::class)->send($candidate,'interview_invitation','Nueva entrevista','Se programó una entrevista para '.$interview->scheduled_at->format('d/m/Y H:i').'.','/mis-postulaciones/'.$interview->application->id);});
        ApplicationMessage::created(function (ApplicationMessage $message): void {$application=$message->application;if($message->sender_id===$application->user_id){foreach($application->job->company->members()->wherePivot('status','active')->get() as $member)app(MultichannelNotifier::class)->send($member,'application_message','Nuevo mensaje de candidato','Recibiste un mensaje en '.$application->job->title.'.','/empresa/candidatos/'.$application->id);}else app(MultichannelNotifier::class)->send($application->user,'application_message','Nuevo mensaje de empresa','Recibiste un mensaje sobre '.$application->job->title.'.','/mis-postulaciones/'.$application->id);});
    }
}
