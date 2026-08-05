<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ApplicationMessage extends Model{protected $fillable=['job_application_id','sender_id','body','read_at'];protected function casts():array{return['read_at'=>'datetime'];}public function sender():BelongsTo{return $this->belongsTo(User::class,'sender_id');}}
