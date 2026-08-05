<?php
namespace Tests\Feature;
use App\Models\User;use Illuminate\Foundation\Testing\RefreshDatabase;use Tests\TestCase;
class CandidateCvTest extends TestCase{use RefreshDatabase;
 public function test_candidate_can_export_each_pdf_template():void{$user=User::factory()->create(['account_type'=>'candidate','name'=>'Ana Pérez']);$user->candidateProfile()->create(['professional_title'=>'Desarrolladora','summary'=>'Perfil de prueba','skills'=>['React','TypeScript'],'experience'=>[['role'=>'Developer','company'=>'Acme','period'=>'2024 - 2026','description'=>'Productos web']]]);foreach(['classic','modern','minimal'] as $template){$response=$this->actingAs($user,'sanctum')->get('/api/v1/candidate/cv/export?template='.$template);$response->assertOk()->assertHeader('content-type','application/pdf');$this->assertStringStartsWith('%PDF',$response->getContent());}}
 public function test_company_cannot_export_candidate_cv():void{$user=User::factory()->create(['account_type'=>'company']);$this->actingAs($user,'sanctum')->get('/api/v1/candidate/cv/export?template=classic')->assertForbidden();}
}
