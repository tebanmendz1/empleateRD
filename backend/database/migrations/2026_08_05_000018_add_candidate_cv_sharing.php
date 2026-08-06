<?php
use Illuminate\Database\Migrations\Migration;use Illuminate\Database\Schema\Blueprint;use Illuminate\Support\Facades\Schema;
return new class extends Migration{public function up():void{Schema::table('candidate_profiles',function(Blueprint $t):void{$t->uuid('public_cv_token')->nullable()->unique();$t->boolean('public_cv_enabled')->default(false)->index();});}public function down():void{Schema::table('candidate_profiles',function(Blueprint $t):void{$t->dropUnique(['public_cv_token']);$t->dropColumn(['public_cv_token','public_cv_enabled']);});}};
