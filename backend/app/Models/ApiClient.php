<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ApiClient extends Model{protected $fillable=['company_id','created_by','name','key_prefix','key_hash','scopes','last_used_at','expires_at','active'];protected function casts():array{return['scopes'=>'array','last_used_at'=>'datetime','expires_at'=>'datetime','active'=>'boolean'];}public function company():BelongsTo{return $this->belongsTo(Company::class);}}
