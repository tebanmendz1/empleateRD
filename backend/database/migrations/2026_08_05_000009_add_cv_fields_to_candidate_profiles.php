<?php
use Illuminate\Database\Migrations\Migration;use Illuminate\Database\Schema\Blueprint;use Illuminate\Support\Facades\Schema;
return new class extends Migration{public function up():void{Schema::table('candidate_profiles',function(Blueprint $t):void{$t->json('experience')->nullable();$t->json('education')->nullable();$t->json('certifications')->nullable();$t->string('portfolio_url')->nullable();});}public function down():void{Schema::table('candidate_profiles',function(Blueprint $t):void{$t->dropColumn(['experience','education','certifications','portfolio_url']);});}};
