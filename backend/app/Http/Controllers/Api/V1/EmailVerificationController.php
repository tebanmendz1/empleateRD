<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller; use App\Models\User; use Illuminate\Auth\Events\Verified; use Illuminate\Http\JsonResponse; use Illuminate\Http\RedirectResponse; use Illuminate\Http\Request; use Illuminate\Support\Facades\Log; use Throwable;
class EmailVerificationController extends Controller {
 public function verify(Request $request,int $id,string $hash):RedirectResponse{$user=User::findOrFail($id);abort_unless(hash_equals($hash,sha1($user->getEmailForVerification())),403);if(!$user->hasVerifiedEmail()&&$user->markEmailAsVerified()){event(new Verified($user));}return redirect(rtrim(config('app.frontend_url'),'/').'/verificar?status=verified');}
 public function resend(Request $request):JsonResponse{if($request->user()->hasVerifiedEmail())return response()->json(['message'=>'Tu correo ya está verificado.']);try{$request->user()->sendEmailVerificationNotification();}catch(Throwable $exception){Log::error('No fue posible enviar el correo de verificación.',['user_id'=>$request->user()->id,'exception'=>$exception->getMessage()]);return response()->json(['message'=>'El servicio de correo no está disponible. Revisa la configuración SMTP de EmpléateRD e intenta nuevamente.'],503);}return response()->json(['message'=>'Enlace de verificación enviado.']);}
}
