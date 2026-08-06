<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class JobFair extends Model{protected $fillable=['created_by','title','slug','description','format','location_or_link','starts_at','ends_at','status'];protected function casts():array{return['starts_at'=>'datetime','ends_at'=>'datetime'];}}
