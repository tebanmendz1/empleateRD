<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;use App\Models\Job;use Illuminate\Http\JsonResponse;
class PublicJobController extends Controller{public function index():JsonResponse{return response()->json(['data'=>Job::with('company:id,name,slug,location')->where('status','active')->where(fn($q)=>$q->whereNull('expires_at')->orWhere('expires_at','>',now()))->latest('published_at')->paginate(20)]);}public function show(Job $job):JsonResponse{abort_unless($job->status==='active'&&(!$job->expires_at||$job->expires_at->isFuture()),404);return response()->json(['data'=>$job->load('company:id,name,slug,description,location')]);}}
