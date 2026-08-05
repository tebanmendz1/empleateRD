<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class PricingVersion extends Model{protected $fillable=['name','version','rules','is_active','effective_from'];protected function casts():array{return ['rules'=>'array','is_active'=>'boolean','effective_from'=>'datetime'];}}
