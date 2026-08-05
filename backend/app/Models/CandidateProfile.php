<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class CandidateProfile extends Model { protected $fillable=['professional_title','summary','province','city','desired_roles','interest_areas','preferred_modalities','preferred_provinces','salary_expectation','availability','employment_types','willing_to_relocate','skills','languages']; protected function casts():array{return ['desired_roles'=>'array','interest_areas'=>'array','preferred_modalities'=>'array','preferred_provinces'=>'array','employment_types'=>'array','skills'=>'array','languages'=>'array','willing_to_relocate'=>'boolean','salary_expectation'=>'integer'];} public function user():BelongsTo{return $this->belongsTo(User::class);} }
