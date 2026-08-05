<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyTeamTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_manage_existing_company_users(): void
    {
        $owner = User::factory()->create(['account_type' => 'company']);
        $member = User::factory()->create(['account_type' => 'company']);
        $this->actingAs($owner, 'sanctum')->getJson('/api/v1/company/profile')->assertOk();
        $this->actingAs($owner, 'sanctum')->postJson('/api/v1/company/team', ['email' => $member->email, 'role' => 'recruiter'])->assertCreated()->assertJsonFragment(['email' => $member->email, 'role' => 'recruiter']);
        $this->actingAs($owner, 'sanctum')->patchJson('/api/v1/company/team/'.$member->id, ['role' => 'viewer'])->assertOk();
        $this->actingAs($owner, 'sanctum')->deleteJson('/api/v1/company/team/'.$member->id)->assertOk()->assertJsonCount(1, 'data');
    }

    public function test_non_owner_cannot_manage_team(): void
    {
        $owner = User::factory()->create(['account_type' => 'company']);
        $member = User::factory()->create(['account_type' => 'company']);
        $target = User::factory()->create(['account_type' => 'company']);
        $companyId = $this->actingAs($owner, 'sanctum')->getJson('/api/v1/company/profile')->json('data.id');
        $member->companies()->attach($companyId, ['role' => 'recruiter', 'status' => 'active']);
        $this->actingAs($member, 'sanctum')->postJson('/api/v1/company/team', ['email' => $target->email, 'role' => 'viewer'])->assertForbidden();
    }
}
