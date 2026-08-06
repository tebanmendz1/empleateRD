<?php
namespace App\Services;use Illuminate\Support\Str;
class VideoMeetingService{public function create():string{return rtrim((string)config('services.video_meetings.base_url','https://meet.jit.si'),'/').'/EmpleateRD-'.Str::uuid();}}
