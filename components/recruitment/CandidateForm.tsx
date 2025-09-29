import React from 'react';
import { User, Mail, Phone, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CandidateInfo } from '@/types/resume';
import { ROLE_REQUIREMENTS } from '@/lib/constants';

interface CandidateFormProps {
  candidate: CandidateInfo;
  onChange: (candidate: CandidateInfo) => void;
  disabled?: boolean;
}

export const CandidateForm: React.FC<CandidateFormProps> = ({
  candidate,
  onChange,
  disabled = false
}) => {
  const handleInputChange = (field: keyof CandidateInfo, value: string) => {
    onChange({
      ...candidate,
      [field]: value
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Candidate Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter candidate's full name"
              value={candidate.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={disabled}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="candidate@example.com"
              value={candidate.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={disabled}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={candidate.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Target Role *
            </Label>
            <Select
              value={candidate.role}
              onValueChange={(value) => handleInputChange('role', value)}
              disabled={disabled}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target role" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ROLE_REQUIREMENTS).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {candidate.role && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Required Skills for {candidate.role}:</h4>
            <div className="flex flex-wrap gap-2">
              {ROLE_REQUIREMENTS[candidate.role as keyof typeof ROLE_REQUIREMENTS]?.slice(0, 8).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {ROLE_REQUIREMENTS[candidate.role as keyof typeof ROLE_REQUIREMENTS]?.length > 8 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{ROLE_REQUIREMENTS[candidate.role as keyof typeof ROLE_REQUIREMENTS].length - 8} more
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};