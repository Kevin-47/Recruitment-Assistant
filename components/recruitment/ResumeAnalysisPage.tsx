import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { CandidateForm } from "./CandidateForm";
import { AnalysisResults } from "./AnalysisResults";
import { EmailService } from "./EmailService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CandidateInfo, AnalysisResult } from "@/types/resume";

export const ResumeAnalysisPage = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<CandidateInfo>({
    name: "",
    email: "",
    phone: "",
    role: ""
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  // Mock analysis function
  const performAnalysis = () => {
    if (!candidate.name || !candidate.email || !candidate.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required candidate information",
        variant: "destructive",
      });
      return;
    }

    // Create and click a temporary anchor tag
    const link = document.createElement('a');
    link.href = 'https://zingy-dusk-cc3330.netlify.app/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;

    const reportData = {
      candidate,
      analysis: analysisResult,
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-analysis-${candidate.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Analysis report has been saved to your device",
    });
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setEmailSent(false);
    setCandidate({
      name: "",
      email: "",
      phone: "",
      role: ""
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Complete Resume Analysis</CardTitle>
                <CardDescription>
                  AI-powered resume screening with candidate information and detailed analysis
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {!analysisResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Candidate Form */}
            <CandidateForm
              candidate={candidate}
              onChange={setCandidate}
              disabled={isAnalyzing}
            />

            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Resume Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                  <p className="text-muted-foreground mb-4">
                    Support for PDF, DOC, DOCX formats up to 10MB
                  </p>
                  <Button variant="outline" disabled={isAnalyzing}>
                    Browse Files
                  </Button>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={performAnalysis}
                    disabled={isAnalyzing || !candidate.name || !candidate.email || !candidate.role}
                    className="w-full"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Analysis Results */}
            <AnalysisResults
              result={analysisResult}
              candidate={candidate}
              onSendEmail={() => setEmailSent(false)}
              onDownloadReport={handleDownloadReport}
              emailSending={false}
            />

            {/* Email Service */}
            <EmailService
              candidate={candidate}
              analysisResult={analysisResult}
              onEmailSent={() => setEmailSent(true)}
              emailSent={emailSent}
            />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={resetAnalysis} variant="outline">
                Analyze Another Resume
              </Button>
              <Button onClick={() => window.history.back()}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};