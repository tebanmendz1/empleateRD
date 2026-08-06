"use client";
import Link from "next/link";import { useStoredUser } from "./account-nav";
const candidateLinks=[["/empleos","Buscar empleos"],["/mi-perfil","Mi perfil"],["/constructor-cv","Crear CV"],["/mis-postulaciones","Postulaciones"],["/notificaciones","Notificaciones"]];
const companyLinks=[["/panel","Panel empresarial"],["/empresa/vacantes","Vacantes"],["/empresa/candidatos","Candidatos"],["/empresa/talentos","Talentos"],["/empresa/reportes","Reportes"],["/notificaciones","Notificaciones"]];
const adminLinks=[["/admin","Administración"],["/admin/reportes","Métricas"],["/admin/ferias","Ferias"],["/admin/sistema","Sistema"]];
export function RoleNavigation(){const user=useStoredUser();const links=user?.is_admin?adminLinks:user?.account_type==="company"?companyLinks:candidateLinks;return <nav aria-label="Navegación principal" className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">{links.map(([href,label])=><Link key={href} href={href} className="hover:text-blue-700">{label}</Link>)}</nav>}
