import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Video, Play, BarChart, User, MessageSquare, Smile, Eye, Upload, FileText, Brain, CheckCircle, XCircle, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const InterviewAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock analysis data based on actual transcript from uploaded files
  const mockAnalysis = {
    overallScore: 65,
    confidence: 0.65, // Based on candidate's self-rating and hesitation patterns
    communicationScore: 70,
    technicalScore: 68, // Good Java knowledge but needs more confidence
    bodyLanguage: 75,
    transcript: `Interviewer: Rate yourself in Java out of 10.

Candidate: I think I rate myself for 6.5 out of 10 in Java.

Interviewer: OK, good. Now tell me what are JDK, JVM and JRE? Please explain about them.

Candidate: First should be the JDK which is the Java Development Kit, software package of JVM and JRE contains both, basically provides the standard edition of the JAVA application programming interface. Second was JVM which is the Java Virtual Machine, it's basically converts the program into bytecode which basically means it converts a user friendly syntax to machine language that the Java Virtual Machine and the interpreter can understand. Third one will be the JRE which is the Java Runtime Environment and provides the libraries and the resources dedicated to execute the Java programs. I think that's the main distinction between these three.

Interviewer: Yeah right, right. So can you tell me does Java include pointers?

Candidate: Java does not include pointers. Can you just please explain the first part of pointers? The main benefit I would say would be for taking care of memory allocation.`,
    
    sentimentAnalysis: {
      positive: 45,
      neutral: 35,
      negative: 20
    },
    qaPairs: [
      {
        question: "Rate yourself in Java out of 10",
        answer: "I think I rate myself for 6.5 out of 10 in Java",
        confidence: 0.8,
        accuracy: "correct"
      },
      {
        question: "What are JDK, JVM and JRE? Please explain about them",
        answer: "JDK is the Java Development Kit containing JVM and JRE. JVM is the Java Virtual Machine that converts program into bytecode. JRE is the Java Runtime Environment providing libraries and resources for executing Java programs",
        confidence: 0.85,
        accuracy: "correct"
      },
      {
        question: "Does Java include pointers?",
        answer: "Java does not include pointers. Pointers main benefit would be for memory allocation",
        confidence: 0.9,
        accuracy: "correct"
      }
    ],
    keyInsights: [
      "Candidate shows moderate confidence in Java skills (6.5/10 self-rating)",
      "Excellent understanding of core Java concepts (JDK, JVM, JRE)",
      "Correctly identified that Java doesn't use pointers",
      "Some hesitation in communication but technically accurate",
      "Would benefit from more confident presentation of knowledge",
      "Solid foundational knowledge suitable for mid-level positions"
    ],
    timeBreakdown: {
      introduction: 5,
      technical: 65,
      behavioral: 15,
      questions: 10,
      closing: 5
    },
    summary: "The candidate demonstrated solid Java knowledge with accurate explanations of JDK, JVM, JRE, and pointers. Self-assessment of 6.5/10 shows realistic self-awareness. Technical competency is strong but presentation confidence could be improved. Suitable for mid-level Java development roles."
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg'];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a video (MP4, AVI, MOV, WebM) or audio (MP3, WAV, M4A, OGG) file.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 500MB.",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      toast({
        title: "File Uploaded Successfully",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB) ready for analysis`,
        variant: "default"
      });
    }
  };

  const startAnalysis = async () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a video or audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate comprehensive analysis progress based on Python backend workflow
    const progressSteps = [
      { step: 15, message: "Extracting audio from video file..." },
      { step: 30, message: "Converting and splitting audio segments..." },
      { step: 50, message: "Transcribing speech using AI..." },
      { step: 70, message: "Analyzing Q&A patterns with AI..." },
      { step: 85, message: "Evaluating candidate confidence..." },
      { step: 95, message: "Generating behavioral insights..." },
      { step: 100, message: "Finalizing analysis report..." }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysisProgress(step);
      toast({
        title: "Processing Interview",
        description: message,
      });
    }

    setIsAnalyzing(false);
    setAnalysisComplete(true);
    toast({
      title: "Analysis Complete!",
      description: `Interview analyzed successfully. Overall score: ${mockAnalysis.overallScore}%`,
    });
  };

  const generateReport = () => {
    // Create downloadable report
    const reportData = {
      candidate: uploadedFile?.name || "Interview Analysis",
      date: new Date().toLocaleDateString(),
      ...mockAnalysis
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interview-analysis-report.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>AI Video Interview Analysis</CardTitle>
              <CardDescription>
                Advanced behavioral analysis, sentiment detection, Q&A extraction and performance evaluation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!analysisComplete && !isAnalyzing ? (
            <div className="text-center py-12">
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 hover:border-primary/50 transition-all duration-200 hover:bg-muted/10 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 text-muted-foreground/60 mx-auto mb-6" />
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Upload Interview Recording</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Upload a video or audio file for comprehensive AI-powered analysis including 
                      transcript generation, Q&A evaluation, and confidence scoring.
                    </p>
                    <div className="bg-muted/30 rounded-md p-3 mt-4">
                      <p className="text-sm text-muted-foreground font-medium">
                        📹 Video: MP4, AVI, MOV, WebM
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        🎵 Audio: MP3, WAV, M4A, OGG
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum file size: 500MB
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/avi,video/mov,video/webm,audio/mp3,audio/wav,audio/m4a,audio/ogg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                
                {uploadedFile && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-muted-foreground">
                              📁 {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                            <p className="text-sm text-muted-foreground">
                              🕒 {uploadedFile.type.includes('video') ? 'Video File' : 'Audio File'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={startAnalysis}
                  disabled={!uploadedFile}
                  className="w-full"
                  size="lg"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Start AI Analysis
                </Button>
              </div>
            </div>
          ) : isAnalyzing ? (
            <div className="text-center py-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analyzing Interview...</h3>
                  <p className="text-muted-foreground mb-4">
                    AI is processing your video for insights
                  </p>
                  <div className="max-w-md mx-auto">
                    <Progress value={analysisProgress} className="h-3 mb-2" />
                    <p className="text-sm text-muted-foreground">{analysisProgress}% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Video Player Mock */}
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Interview Recording - {uploadedFile?.name || "Analysis Complete"}</p>
                  <p className="text-sm opacity-60">Duration: 03:47</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 rounded-full h-1">
                    <div className="bg-primary h-full rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="qa-analysis">Q&A Analysis</TabsTrigger>
                  <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Overall Interview Score</h3>
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {mockAnalysis.overallScore}%
                      </Badge>
                    </div>
                    <Progress value={mockAnalysis.overallScore} className="h-3 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Solid Java knowledge with room for confidence improvement
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                          Communication
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">{mockAnalysis.communicationScore}%</div>
                        <Progress value={mockAnalysis.communicationScore} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                          <BarChart className="w-4 h-4 mr-2 text-accent" />
                          Technical
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">{mockAnalysis.technicalScore}%</div>
                        <Progress value={mockAnalysis.technicalScore} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center">
                          <User className="w-4 h-4 mr-2 text-success" />
                          Body Language
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">{mockAnalysis.bodyLanguage}%</div>
                        <Progress value={mockAnalysis.bodyLanguage} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Confidence Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Candidate Confidence Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Confidence</span>
                        <span className="text-sm font-bold">{(mockAnalysis.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={mockAnalysis.confidence * 100} className="h-3 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Based on speech patterns, tone, and self-assessment indicators
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transcript" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Interview Transcript
                      </CardTitle>
                      <CardDescription>
                        Complete transcription with speaker identification
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {mockAnalysis.transcript}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="qa-analysis" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Question & Answer Analysis
                      </CardTitle>
                      <CardDescription>
                        AI-extracted Q&A pairs with confidence and accuracy scoring
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalysis.qaPairs.map((pair, index) => (
                          <div key={index} className="border border-border rounded-lg p-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-semibold text-foreground">Q: {pair.question}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">A: {pair.answer}</p>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">Confidence:</span>
                                    <span className="text-sm font-medium">{(pair.confidence * 100).toFixed(0)}%</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">Accuracy:</span>
                                    <Badge variant={pair.accuracy === 'correct' ? 'default' : 'destructive'} className="text-xs">
                                      {pair.accuracy === 'correct' ? (
                                        <><CheckCircle className="w-3 h-3 mr-1" /> Correct</>
                                      ) : (
                                        <><XCircle className="w-3 h-3 mr-1" /> Incorrect</>
                                      )}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sentiment Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Smile className="w-4 h-4 text-success" />
                            <span>Positive</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={mockAnalysis.sentimentAnalysis.positive} className="w-24 h-2" />
                            <span className="text-sm font-medium">{mockAnalysis.sentimentAnalysis.positive}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-muted" />
                            <span>Neutral</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={mockAnalysis.sentimentAnalysis.neutral} className="w-24 h-2" />
                            <span className="text-sm font-medium">{mockAnalysis.sentimentAnalysis.neutral}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-destructive" />
                            <span>Negative</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Progress value={mockAnalysis.sentimentAnalysis.negative} className="w-24 h-2" />
                            <span className="text-sm font-medium">{mockAnalysis.sentimentAnalysis.negative}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="behavior" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Interview Time Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(mockAnalysis.timeBreakdown).map(([section, percentage]) => (
                          <div key={section} className="flex items-center justify-between">
                            <span className="capitalize">{section}</span>
                            <div className="flex items-center space-x-3">
                              <Progress value={percentage * 2} className="w-24 h-2" />
                              <span className="text-sm font-medium w-12 text-right">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Behavioral Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-success/10 rounded-lg">
                          <div className="text-2xl font-bold text-success">72%</div>
                          <div className="text-sm text-muted-foreground">Eye Contact</div>
                        </div>
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">68%</div>
                          <div className="text-sm text-muted-foreground">Engagement</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">AI-Generated Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalysis.keyInsights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {mockAnalysis.summary}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex space-x-4">
                <Button onClick={generateReport} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="flex-1">Schedule Follow-up</Button>
                <Button variant="outline">Export Analysis</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};