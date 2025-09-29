import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, Brain, CheckCircle, AlertCircle, Star } from "lucide-react";

export const ResumeAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const mockResults = {
    overallScore: 85,
    skills: [
      { skill: "React.js", match: 95, required: true },
      { skill: "TypeScript", match: 88, required: true },
      { skill: "Node.js", match: 75, required: false },
      { skill: "Python", match: 60, required: false },
    ],
    experience: { years: 4, relevantYears: 3 },
    education: { degree: "B.Tech Computer Science", match: 90 },
    recommendations: [
      "Strong technical background aligns well with requirements",
      "Consider for senior developer position",
      "Schedule technical interview to validate skills"
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>AI-Powered Resume Analyzer</CardTitle>
              <CardDescription>
                Advanced resume screening with skill matching and compatibility analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!analysisComplete ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Resume for Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Support for PDF, DOC, DOCX formats up to 10MB
              </p>
              <div className="space-x-4">
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
                <Button variant="outline">Browse Files</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Overall Compatibility Score</h3>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {mockResults.overallScore}%
                  </Badge>
                </div>
                <Progress value={mockResults.overallScore} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Excellent match for the Software Engineer position
                </p>
              </div>

              {/* Skills Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skills Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.skill}</span>
                            {skill.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24">
                            <Progress value={skill.match} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {skill.match}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Education */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-success" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{mockResults.experience.years} years</p>
                    <p className="text-sm text-muted-foreground">
                      {mockResults.experience.relevantYears} years relevant experience
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Star className="w-4 h-4 mr-2 text-warning" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{mockResults.education.degree}</p>
                    <div className="flex items-center mt-2">
                      <Progress value={mockResults.education.match} className="h-2 flex-1 mr-3" />
                      <span className="text-sm font-medium">{mockResults.education.match}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button className="flex-1">Schedule Interview</Button>
                <Button variant="outline" className="flex-1">Generate Report</Button>
                <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
                  Analyze Another
                </Button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                <span className="text-sm font-medium">AI Analysis in Progress...</span>
              </div>
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Processing resume content, extracting skills, and matching with job requirements...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};