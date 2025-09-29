import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CandidateManager } from "@/components/recruitment/CandidateManager";

export default function CandidatePipeline() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidate Pipeline</h1>
          <p className="text-muted-foreground">Track and manage candidates through the recruitment process</p>
        </div>
        
        <CandidateManager />
      </div>
    </DashboardLayout>
  );
}