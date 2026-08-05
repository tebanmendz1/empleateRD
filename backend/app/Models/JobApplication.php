<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class JobApplication extends Model{protected $fillable=['job_id','user_id','candidate_document_id','status','profile_snapshot','cover_letter','applied_at','withdrawn_at'];protected function casts():array{return ['profile_snapshot'=>'array','applied_at'=>'datetime','withdrawn_at'=>'datetime'];}public function job():BelongsTo{return $this->belongsTo(Job::class);}public function user():BelongsTo{return $this->belongsTo(User::class);}public function document():BelongsTo{return $this->belongsTo(CandidateDocument::class,'candidate_document_id');}}
