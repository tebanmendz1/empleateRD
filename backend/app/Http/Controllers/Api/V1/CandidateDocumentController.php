<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;use App\Models\CandidateDocument;use Illuminate\Http\JsonResponse;use Illuminate\Http\Request;use Illuminate\Support\Facades\Storage;use Symfony\Component\HttpFoundation\StreamedResponse;
class CandidateDocumentController extends Controller{
 public function index(Request $request):JsonResponse{$this->candidateOnly($request);return response()->json(['data'=>$request->user()->candidateDocuments()->latest()->get()]);}
 public function store(Request $request):JsonResponse{$this->candidateOnly($request);$request->validate(['document'=>['required','file','mimes:pdf,doc,docx','max:5120'],'kind'=>['required','in:cv,certification,portfolio']]);$file=$request->file('document');$path=$file->store('candidates/'.$request->user()->id,'local');$document=$request->user()->candidateDocuments()->create(['kind'=>(string)$request->string('kind'),'original_name'=>$file->getClientOriginalName(),'path'=>$path,'mime_type'=>$file->getMimeType()?:'application/octet-stream','size'=>$file->getSize()]);return response()->json(['data'=>$document,'message'=>'Documento guardado de forma privada.'],201);}
 public function download(Request $request,CandidateDocument $document):StreamedResponse{$this->owns($request,$document);return Storage::disk('local')->download($document->path,$document->original_name);}
 public function destroy(Request $request,CandidateDocument $document):JsonResponse{$this->owns($request,$document);Storage::disk('local')->delete($document->path);$document->delete();return response()->json(['message'=>'Documento eliminado.']);}
 private function owns(Request $request,CandidateDocument $document):void{$this->candidateOnly($request);abort_unless($document->user_id===$request->user()->id,404);}
 private function candidateOnly(Request $request):void{abort_unless($request->user()->account_type==='candidate',403,'Esta función es exclusiva para candidatos.');}
}
