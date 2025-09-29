import React from 'react';
import { Settings, Key, Sliders, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  apiKey: string;
  cutoffScore: number;
  autoEmail: boolean;
  onApiKeyChange: (key: string) => void;
  onCutoffScoreChange: (score: number) => void;
  onAutoEmailChange: (enabled: boolean) => void;
  onSaveSettings: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  apiKey,
  cutoffScore,
  autoEmail,
  onApiKeyChange,
  onCutoffScoreChange,
  onAutoEmailChange,
  onSaveSettings
}) => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    onSaveSettings();
    toast({
      title: "Settings Saved",
      description: "Your configuration has been saved successfully.",
      variant: "default"
    });
  };

  const getScoreDescription = (score: number) => {
    if (score >= 85) return "Very High (Only exceptional candidates)";
    if (score >= 75) return "High (Above average candidates)";
    if (score >= 65) return "Medium (Average candidates)";
    if (score >= 50) return "Low (Below average candidates)";
    return "Very Low (Most candidates will pass)";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Analysis Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Configuration */}
        <div className="space-y-3">
          <Label htmlFor="apiKey" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            OpenAI API Key
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Your API key is stored securely and only used for resume analysis.{' '}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get your API key here
            </a>
          </p>
        </div>

        <Separator />

        {/* Cutoff Score Configuration */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Selection Cutoff Score: {cutoffScore}%
          </Label>
          <div className="px-2">
            <Slider
              value={[cutoffScore]}
              onValueChange={(value) => onCutoffScoreChange(value[0])}
              max={95}
              min={45}
              step={5}
              className="w-full"
            />
          </div>
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>Current Setting:</strong> {getScoreDescription(cutoffScore)}
          </div>
        </div>

        <Separator />

        {/* Email Automation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="autoEmail" className="flex items-center gap-2">
              Automatic Email Sending
            </Label>
            <Switch
              id="autoEmail"
              checked={autoEmail}
              onCheckedChange={onAutoEmailChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            When enabled, selection/rejection emails will be sent automatically after analysis.
          </p>
        </div>

        <Separator />

        {/* Save Button */}
        <Button onClick={handleSaveSettings} className="w-full" variant="default">
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>

        {/* Usage Guidelines */}
        <div className="bg-muted/30 p-4 rounded-lg space-y-2">
          <h4 className="text-sm font-semibold">Usage Guidelines:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• API key is required for AI-powered analysis</li>
            <li>• Higher cutoff scores are more selective</li>
            <li>• Email automation requires valid candidate email</li>
            <li>• Settings are saved locally in your browser</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};