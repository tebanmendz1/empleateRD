<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class CandidateDocument extends Model { protected $fillable=['kind','original_name','path','mime_type','size']; protected $hidden=['path']; public function user():BelongsTo{return $this->belongsTo(User::class);} }
