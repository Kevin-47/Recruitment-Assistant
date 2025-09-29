import React, { useState } from 'react';
import { Calendar, Clock, Mail, User, MapPin, Video, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ScheduleInterviewProps {
  candidateName?: string;
  candidateEmail?: string;
  onScheduled?: (interviewData: any) => void;
}

export const ScheduleInterview: React.FC<ScheduleInterviewProps> = ({
  candidateName = "",
  candidateEmail = "",
  onScheduled
}) => {
  const { toast } = useToast();
  const [isScheduling, setIsScheduling] = useState(false);
  const [formData, setFormData] = useState({
    candidateName,
    candidateEmail,
    interviewDate: "",
    interviewTime: "",
    interviewType: "video",
    location: "",
    interviewerName: "",
    interviewerEmail: "",
    position: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleInterview = async () => {
    if (!formData.candidateName || !formData.candidateEmail || !formData.interviewDate || !formData.interviewTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsScheduling(true);

    try {
      // Simulate API call - in real app, this would schedule the interview
      await new Promise(resolve => setTimeout(resolve, 1000));

      const interviewData = {
        ...formData,
        id: Date.now().toString(),
        status: "scheduled",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for now
      const existingInterviews = JSON.parse(localStorage.getItem('scheduled-interviews') || '[]');
      existingInterviews.push(interviewData);
      localStorage.setItem('scheduled-interviews', JSON.stringify(existingInterviews));

      toast({
        title: "Interview Scheduled",
        description: `Interview scheduled for ${formData.candidateName} on ${formData.interviewDate} at ${formData.interviewTime}`,
      });

      onScheduled?.(interviewData);

      // Reset form
      setFormData({
        candidateName: "",
        candidateEmail: "",
        interviewDate: "",
        interviewTime: "",
        interviewType: "video",
        location: "",
        interviewerName: "",
        interviewerEmail: "",
        position: "",
        notes: ""
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Schedule Interview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="candidateName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Candidate Name *
            </Label>
            <Input
              id="candidateName"
              value={formData.candidateName}
              onChange={(e) => handleInputChange('candidateName', e.target.value)}
              placeholder="Enter candidate name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidateEmail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Candidate Email *
            </Label>
            <Input
              id="candidateEmail"
              type="email"
              value={formData.candidateEmail}
              onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
              placeholder="candidate@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewDate">Interview Date *</Label>
            <Input
              id="interviewDate"
              type="date"
              value={formData.interviewDate}
              onChange={(e) => handleInputChange('interviewDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewTime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Interview Time *
            </Label>
            <Input
              id="interviewTime"
              type="time"
              value={formData.interviewTime}
              onChange={(e) => handleInputChange('interviewTime', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Interview Type</Label>
            <Select value={formData.interviewType} onValueChange={(value) => handleInputChange('interviewType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video Call
                  </div>
                </SelectItem>
                <SelectItem value="in-person">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    In Person
                  </div>
                </SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              placeholder="Job position"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewerName">Interviewer Name</Label>
            <Input
              id="interviewerName"
              value={formData.interviewerName}
              onChange={(e) => handleInputChange('interviewerName', e.target.value)}
              placeholder="Enter interviewer name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewerEmail">Interviewer Email</Label>
            <Input
              id="interviewerEmail"
              type="email"
              value={formData.interviewerEmail}
              onChange={(e) => handleInputChange('interviewerEmail', e.target.value)}
              placeholder="interviewer@company.com"
            />
          </div>
        </div>

        {formData.interviewType === 'in-person' && (
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Interview location/address"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional notes for the interview"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleScheduleInterview} 
          disabled={isScheduling}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isScheduling ? "Scheduling..." : "Schedule Interview"}
        </Button>
      </CardContent>
    </Card>
  );
};