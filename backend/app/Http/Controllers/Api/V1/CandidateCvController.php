<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;use Barryvdh\DomPDF\Facade\Pdf;use Illuminate\Http\Request;use Illuminate\Validation\Rule;use Symfony\Component\HttpFoundation\Response;
class CandidateCvController extends Controller{public function export(Request $request):Response{abort_unless($request->user()->account_type==='candidate',403);$data=$request->validate(['template'=>['required',Rule::in(['classic','modern','minimal'])]]);$profile=$request->user()->candidateProfile;if(!$profile)abort(422,'Completa tu perfil antes de exportar.');$pdf=Pdf::loadView('pdf.cv.'.$data['template'],['user'=>$request->user(),'profile'=>$profile])->setPaper('a4');$name='cv-'.str($request->user()->name)->slug().'-empleaterd.pdf';return $pdf->download($name);}}
