import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CandidateInfo, AnalysisResult } from "@/types/resume";
import { EMAIL_TEMPLATES } from "@/lib/constants";

interface EmailServiceProps {
  candidate: CandidateInfo;
  analysisResult: AnalysisResult;
  onEmailSent: () => void;
  emailSent: boolean;
}

export const EmailService = ({ candidate, analysisResult, onEmailSent, emailSent }: EmailServiceProps) => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async () => {
    // For now, this is a mock implementation
    // In a real application, this would connect to your email service
    // (requires Supabase backend integration for actual email sending)
    
    setIsSending(true);
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = analysisResult.selected ? EMAIL_TEMPLATES.SELECTED : EMAIL_TEMPLATES.REJECTED;
      
      const emailData = {
        to: candidate.email,
        subject: template.subject,
        body: template.template(candidate.name, candidate.role, analysisResult.overall_score)
      };

      console.log('Email would be sent:', emailData);
      
      toast({
        title: "Email Sent Successfully",
        description: `Result notification sent to ${candidate.name}`,
      });
      
      onEmailSent();
    } catch (error) {
      toast({
        title: "Email Send Failed", 
        description: "There was an error sending the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Email Notification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium">{candidate.name}</p>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
          </div>
          <Badge variant={analysisResult.selected ? "default" : "destructive"}>
            {analysisResult.selected ? "Selected" : "Not Selected"}
          </Badge>
        </div>

        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
            <p className="text-sm font-medium">Email Integration Required</p>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            To send actual emails, connect your project to Supabase and configure an email service like Resend or SendGrid.
          </p>
        </div>

        <Button 
          onClick={handleSendEmail}
          disabled={isSending || emailSent}
          className="w-full"
        >
          <Send className="h-4 w-4 mr-2" />
          {emailSent ? 'Email Sent' : isSending ? 'Sending Email...' : 'Send Result Email'}
        </Button>
      </CardContent>
    </Card>
  );
};