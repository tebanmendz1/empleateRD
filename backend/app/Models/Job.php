<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;use Illuminate\Database\Eloquent\Relations\HasMany;
class Job extends Model{protected $table='job_postings';protected $fillable=['company_id','slug','title','summary','location','modality','contract_type','salary_text','status','published_at','expires_at'];protected function casts():array{return ['published_at'=>'datetime','expires_at'=>'datetime'];}public function company():BelongsTo{return $this->belongsTo(Company::class);}public function applications():HasMany{return $this->hasMany(JobApplication::class);}}
