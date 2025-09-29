import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [cutoffScore, setCutoffScore] = useState(75);
  const [autoEmail, setAutoEmail] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('hrtech-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setApiKey(settings.apiKey || "");
      setCutoffScore(settings.cutoffScore || 75);
      setAutoEmail(settings.autoEmail || false);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      apiKey,
      cutoffScore,
      autoEmail,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('hrtech-settings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: "Your configuration has been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your recruitment portal settings</p>
        </div>

        <div className="max-w-2xl">
          <SettingsPanel
            apiKey={apiKey}
            cutoffScore={cutoffScore}
            autoEmail={autoEmail}
            onApiKeyChange={setApiKey}
            onCutoffScoreChange={setCutoffScore}
            onAutoEmailChange={setAutoEmail}
            onSaveSettings={handleSaveSettings}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}