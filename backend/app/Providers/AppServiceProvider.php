<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use App\Models\ApplicationMessage;
use App\Models\Interview;
use App\Models\TalentInvitation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Services\MultichannelNotifier;
use App\Services\VideoMeetingService;

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
        Job::creating(function (Job $job): void {
            $job->country_code ??= $job->company()->value('country_code') ?? 'DO';
        });
        JobApplication::created(function (JobApplication $application): void {
            foreach ($application->job->company->members()->wherePivot('status', 'active')->get() as $member) {
                app(MultichannelNotifier::class)->send($member, 'new_application', 'Nueva postulación', $application->user->name.' aplicó a '.$application->job->title.'. Su perfil y CV están disponibles.', '/empresa/candidatos/'.$application->id);
            }
        });
        TalentInvitation::created(function (TalentInvitation $invitation): void {app(MultichannelNotifier::class)->send($invitation->candidate,'talent_invitation','Nueva invitación laboral',$invitation->company->name.' te invitó a considerar '.$invitation->job->title.'.','/talento');});
        Interview::creating(function (Interview $interview): void {if($interview->format==='video'&&!$interview->location_or_link)$interview->location_or_link=app(VideoMeetingService::class)->create();});
        Interview::created(function (Interview $interview): void {$candidate=$interview->application->user;app(MultichannelNotifier::class)->send($candidate,'interview_invitation','Nueva entrevista','Se programó una entrevista para '.$interview->scheduled_at->format('d/m/Y H:i').'.','/mis-postulaciones/'.$interview->application->id);});
        ApplicationMessage::created(function (ApplicationMessage $message): void {$application=$message->application;if($message->sender_id===$application->user_id){foreach($application->job->company->members()->wherePivot('status','active')->get() as $member)app(MultichannelNotifier::class)->send($member,'application_message','Nuevo mensaje de candidato','Recibiste un mensaje en '.$application->job->title.'.','/empresa/candidatos/'.$application->id);}else app(MultichannelNotifier::class)->send($application->user,'application_message','Nuevo mensaje de empresa','Recibiste un mensaje sobre '.$application->job->title.'.','/mis-postulaciones/'.$application->id);});
    }
}
