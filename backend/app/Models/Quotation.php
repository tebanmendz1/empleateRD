<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Quotation extends Model{protected $fillable=['company_id','created_by','pricing_version_id','reference','answers','breakdown','subtotal','discount','tax','total','currency','status','expires_at'];protected function casts():array{return ['answers'=>'array','breakdown'=>'array','expires_at'=>'datetime'];}public function company():BelongsTo{return $this->belongsTo(Company::class);}public function pricingVersion():BelongsTo{return $this->belongsTo(PricingVersion::class);}}
