import React from 'react';
import { CheckCircle, XCircle, TrendingUp, TrendingDown, Mail, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AnalysisResult, CandidateInfo } from '@/types/resume';
import { SCORING_CRITERIA } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  result: AnalysisResult;
  candidate: CandidateInfo;
  onSendEmail: () => void;
  onDownloadReport: () => void;
  emailSending?: boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  candidate,
  onSendEmail,
  onDownloadReport,
  emailSending = false
}) => {
  const getScoreCategory = (score: number) => {
    if (score >= SCORING_CRITERIA.EXCELLENT.min) return SCORING_CRITERIA.EXCELLENT;
    if (score >= SCORING_CRITERIA.GOOD.min) return SCORING_CRITERIA.GOOD;
    if (score >= SCORING_CRITERIA.FAIR.min) return SCORING_CRITERIA.FAIR;
    return SCORING_CRITERIA.POOR;
  };

  const scoreCategory = getScoreCategory(result.overall_score);
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 55) return 'text-warning';
    return 'text-destructive';
  };

  const getSkillScoreColor = (score: number) => {
    if (score >= 8) return 'bg-success';
    if (score >= 6) return 'bg-primary';
    if (score >= 4) return 'bg-warning';
    return 'bg-destructive';
  };

  const skillEntries = Object.entries(result.skill_scores);
  const topSkills = skillEntries.sort(([,a], [,b]) => b - a).slice(0, 5);
  const weakSkills = skillEntries.sort(([,a], [,b]) => a - b).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header Card with Overall Score */}
      <Card className="border-l-4 border-l-primary shadow-strong">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Analysis Complete</CardTitle>
              <p className="text-muted-foreground">
                Resume analysis for <span className="font-medium">{candidate.name}</span>
              </p>
            </div>
            <div className="text-right">
              <div className={cn("text-4xl font-bold", getScoreColor(result.overall_score))}>
                {result.overall_score}%
              </div>
              <Badge variant={result.selected ? "default" : "destructive"} className="mt-1">
                {result.selected ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Selected
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Not Selected
                  </>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-primary">{scoreCategory.label}</div>
              <p className="text-sm text-muted-foreground">Performance Level</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-foreground">{result.strengths.length}</div>
              <p className="text-sm text-muted-foreground">Strong Skills</p>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-foreground">{result.improvement_areas.length}</div>
              <p className="text-sm text-muted-foreground">Areas to Improve</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={onSendEmail} disabled={emailSending} variant="default">
              <Mail className="h-4 w-4 mr-2" />
              {emailSending ? 'Sending...' : 'Send Result Email'}
            </Button>
            <Button onClick={onDownloadReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Top Performing Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topSkills.map(([skill, score]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill}</span>
                  <span className={cn("font-bold", getScoreColor(score * 10))}>
                    {score}/10
                  </span>
                </div>
                <Progress value={score * 10} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakSkills.length > 0 ? weakSkills.map(([skill, score]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill}</span>
                  <span className={cn("font-bold", getScoreColor(score * 10))}>
                    {score}/10
                  </span>
                </div>
                <Progress value={score * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {result.skill_reasoning[skill] || 'Consider adding more examples and experience'}
                </p>
              </div>
            )) : (
              <p className="text-muted-foreground text-center py-4">
                No significant areas for improvement identified
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-success">Key Strengths</h4>
              {result.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No specific strengths identified</p>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-warning">Improvement Areas</h4>
              {result.improvement_areas.length > 0 ? (
                <ul className="space-y-2">
                  {result.improvement_areas.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No specific improvements needed</p>
              )}
            </div>
          </div>
          
          {result.reasoning && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Analysis Summary</h4>
              <p className="text-sm text-muted-foreground">{result.reasoning}</p>
            </div>
          )}
          
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};