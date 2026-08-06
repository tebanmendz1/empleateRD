"use client";
import { useEffect } from "react";import { api } from "@/lib/api";
export function JobEngagement({slug,event}:{slug:string;event:"view"|"apply_start"}){useEffect(()=>{let visitor=localStorage.getItem("empleaterd_visitor");if(!visitor){visitor=crypto.randomUUID();localStorage.setItem("empleaterd_visitor",visitor);}api(`/jobs/${slug}/engagement`,{method:"POST",body:JSON.stringify({event,visitor_id:visitor})}).catch(()=>{});},[event,slug]);return null;}
