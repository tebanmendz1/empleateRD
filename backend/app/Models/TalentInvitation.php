<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class TalentInvitation extends Model{protected $fillable=['company_id','job_id','candidate_user_id','sent_by','message','status','responded_at'];protected function casts():array{return['responded_at'=>'datetime'];}public function company():BelongsTo{return $this->belongsTo(Company::class);}public function job():BelongsTo{return $this->belongsTo(Job::class);}public function candidate():BelongsTo{return $this->belongsTo(User::class,'candidate_user_id');}}
