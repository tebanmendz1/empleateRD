<?php
namespace Database\Seeders;
use App\Models\Company;use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder{
 public function run():void{$this->call(AdminUserSeeder::class);$records=[
  ['Caribe Digital','caribe-digital','desarrollador-frontend-react','Desarrollador Frontend React','Construye productos digitales modernos para clientes del Caribe.','Distrito Nacional','Híbrido','Tiempo completo','RD$85,000 – RD$115,000'],
  ['Conexión Global','conexion-global','representante-servicio-al-cliente','Representante de Servicio al Cliente','Brinda soporte cercano a clientes locales e internacionales.','Santo Domingo','Presencial','Tiempo completo','RD$38,000 – RD$48,000'],
  ['Grupo Horizonte','grupo-horizonte','analista-contabilidad','Analista de Contabilidad','Apoya el cierre contable y los controles financieros.','Santiago','Presencial','Tiempo completo','RD$55,000 – RD$70,000'],
  ['Altavista Soluciones','altavista-soluciones','ejecutivo-ventas-corporativas','Ejecutivo de Ventas Corporativas','Desarrolla relaciones comerciales y presenta soluciones tecnológicas.','Distrito Nacional','Híbrido','Tiempo completo','RD$45,000 + comisiones'],
  ['Centro Médico del Cibao','centro-medico-del-cibao','enfermera-asistencial','Enfermera Asistencial','Forma parte de un equipo clínico comprometido con una atención humana.','Santiago','Presencial','Tiempo completo','RD$48,000 – RD$58,000'],
  ['Quisqueya Travel','quisqueya-travel','agente-reservas-remoto','Agente de Reservas','Ayuda a viajeros a planificar experiencias desde cualquier provincia.','República Dominicana','Remoto','Tiempo completo','RD$42,000 – RD$52,000'],
 ];foreach($records as[$companyName,$companySlug,$jobSlug,$title,$summary,$location,$modality,$contract,$salary]){$company=Company::updateOrCreate(['slug'=>$companySlug],['name'=>$companyName,'description'=>'Empresa dominicana comprometida con procesos de contratación transparentes.','location'=>'República Dominicana','status'=>'active']);$company->jobs()->updateOrCreate(['slug'=>$jobSlug],['title'=>$title,'summary'=>$summary,'location'=>$location,'modality'=>$modality,'contract_type'=>$contract,'salary_text'=>$salary,'status'=>'active','published_at'=>now(),'expires_at'=>now()->addDays(30)]);}}
}
