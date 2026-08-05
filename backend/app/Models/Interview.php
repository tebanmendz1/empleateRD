<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Interview extends Model{protected $fillable=['job_application_id','created_by','title','scheduled_at','duration_minutes','format','location_or_link','notes','status','responded_at'];protected function casts():array{return['scheduled_at'=>'datetime','responded_at'=>'datetime'];}public function application():BelongsTo{return $this->belongsTo(JobApplication::class,'job_application_id');}}
