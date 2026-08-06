<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class Assessment extends Model{protected $fillable=['company_id','job_id','created_by','title','instructions','duration_minutes','questions','status'];protected function casts():array{return['questions'=>'array'];}}
