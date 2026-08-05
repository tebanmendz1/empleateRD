<?php
namespace Tests\Feature;
use App\Models\User; use Illuminate\Auth\Notifications\VerifyEmail; use Illuminate\Foundation\Testing\RefreshDatabase; use Illuminate\Support\Facades\Notification; use Tests\TestCase;
class AuthTest extends TestCase { use RefreshDatabase;
 public function test_candidate_can_register():void {Notification::fake();$response=$this->postJson('/api/v1/auth/register',['name'=>'Ana Pérez','email'=>'ana@example.com','phone'=>'8095550101','account_type'=>'candidate','password'=>'Password123!','password_confirmation'=>'Password123!','terms'=>true]);$response->assertCreated()->assertJsonPath('data.user.account_type','candidate')->assertJsonStructure(['data'=>['token']]);$this->assertDatabaseHas('users',['email'=>'ana@example.com']);Notification::assertSentTo(User::first(),VerifyEmail::class);}
 public function test_user_can_login_and_read_profile():void {$user=User::factory()->create(['password'=>'Password123!']);$login=$this->postJson('/api/v1/auth/login',['email'=>$user->email,'password'=>'Password123!'])->assertOk();$token=$login->json('data.token');$this->withToken($token)->getJson('/api/v1/auth/user')->assertOk()->assertJsonPath('data.email',$user->email);}
 public function test_invalid_credentials_are_rejected():void {User::factory()->create(['email'=>'ana@example.com']);$this->postJson('/api/v1/auth/login',['email'=>'ana@example.com','password'=>'incorrecta'])->assertUnprocessable()->assertJsonValidationErrors('email');}
 public function test_forgot_password_does_not_disclose_unknown_email():void {$this->postJson('/api/v1/auth/forgot-password',['email'=>'unknown@example.com'])->assertOk()->assertJsonStructure(['message']);}
}
