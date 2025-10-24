import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface NoiseControlProps {
  noiseLevel: number;
  onNoiseChange: (value: number) => void;
}

export const NoiseControl = ({ noiseLevel, onNoiseChange }: NoiseControlProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-quantum">
      <h2 className="text-xl font-bold mb-4 text-foreground">Noise Level</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Depolarizing Error Probability</span>
          <span className="text-lg font-mono font-bold text-primary">{noiseLevel.toFixed(2)}%</span>
        </div>
        <Slider
          value={[noiseLevel]}
          onValueChange={(values) => onNoiseChange(values[0])}
          min={0}
          max={50}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Simulates quantum decoherence and gate errors
        </p>
      </div>
    </Card>
  );
};
