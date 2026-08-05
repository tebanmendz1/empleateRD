<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CompanyTeamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $company = $this->company($request);

        return response()->json(['data' => $this->members($company)]);
    }

    public function store(Request $request): JsonResponse
    {
        $company = $this->ownerCompany($request);
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'role' => ['required', Rule::in(['admin', 'recruiter', 'viewer'])],
        ], ['email.exists' => 'La persona debe crear primero una cuenta empresarial en EmpléateRD.']);
        $user = User::where('email', $data['email'])->firstOrFail();
        abort_unless($user->account_type === 'company', 422, 'Solo puedes agregar cuentas empresariales o de representantes.');
        abort_if($company->members()->whereKey($user->id)->exists(), 422, 'Esta persona ya pertenece al equipo.');
        $company->members()->attach($user->id, ['role' => $data['role'], 'status' => 'active']);

        return response()->json(['data' => $this->members($company), 'message' => 'Miembro agregado al equipo.'], 201);
    }

    public function update(Request $request, User $member): JsonResponse
    {
        $company = $this->ownerCompany($request);
        abort_unless($company->members()->whereKey($member->id)->exists(), 404);
        abort_if($member->id === $request->user()->id, 422, 'No puedes cambiar tu propio rol de propietario.');
        $data = $request->validate(['role' => ['required', Rule::in(['admin', 'recruiter', 'viewer'])]]);
        $company->members()->updateExistingPivot($member->id, ['role' => $data['role']]);

        return response()->json(['data' => $this->members($company), 'message' => 'Permisos actualizados.']);
    }

    public function destroy(Request $request, User $member): JsonResponse
    {
        $company = $this->ownerCompany($request);
        abort_unless($company->members()->whereKey($member->id)->exists(), 404);
        abort_if($member->id === $request->user()->id, 422, 'No puedes eliminarte como propietario del equipo.');
        $company->members()->detach($member->id);

        return response()->json(['data' => $this->members($company), 'message' => 'Miembro eliminado del equipo.']);
    }

    private function company(Request $request): Company
    {
        abort_unless($request->user()->account_type === 'company', 403);
        $company = $request->user()->companies()->wherePivot('status', 'active')->first();
        abort_unless($company, 422, 'Completa primero el perfil empresarial.');

        return $company;
    }

    private function ownerCompany(Request $request): Company
    {
        $company = $this->company($request);
        abort_unless($company->members()->whereKey($request->user()->id)->first()?->pivot->role === 'owner', 403, 'Solo el propietario puede administrar el equipo.');

        return $company;
    }

    private function members(Company $company): array
    {
        return $company->members()->orderBy('name')->get()->map(fn(User $user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->pivot->role,
            'status' => $user->pivot->status,
        ])->all();
    }
}
