<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class RecruitmentCampaign extends Model{protected $fillable=['company_id','job_id','created_by','name','filters','message','status','matched_count','invited_count','sent_at'];protected function casts():array{return['filters'=>'array','sent_at'=>'datetime'];}}
