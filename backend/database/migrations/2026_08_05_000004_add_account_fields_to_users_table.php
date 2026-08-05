<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up():void {Schema::table('users',function(Blueprint $table):void{$table->string('phone',30)->nullable()->after('email_verified_at');$table->string('account_type',20)->default('candidate')->index()->after('phone');});} public function down():void {Schema::table('users',function(Blueprint $table):void{$table->dropIndex(['account_type']);$table->dropColumn(['phone','account_type']);});} };
