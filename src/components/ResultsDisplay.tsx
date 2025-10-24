import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface ResultsDisplayProps {
  sentBits: [number, number] | null;
  receivedBits: [number, number] | null;
  fidelity: number | null;
}

export const ResultsDisplay = ({ sentBits, receivedBits, fidelity }: ResultsDisplayProps) => {
  const isSuccess = sentBits && receivedBits && 
    sentBits[0] === receivedBits[0] && sentBits[1] === receivedBits[1];

  return (
    <Card className="p-6 bg-card border-border shadow-quantum">
      <h2 className="text-xl font-bold mb-4 text-foreground">Bob's Measurement</h2>
      
      {!receivedBits ? (
        <div className="text-center py-8 text-muted-foreground">
          Run simulation to see results
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Received Bits</div>
              <div className="text-2xl font-mono font-bold text-primary">
                {receivedBits[0]}{receivedBits[1]}
              </div>
            </div>
            {isSuccess ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
          </div>

          {fidelity !== null && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transmission Fidelity</span>
                <span className={`text-lg font-bold ${
                  fidelity > 0.95 ? "text-success" : fidelity > 0.8 ? "text-warning" : "text-destructive"
                }`}>
                  {(fidelity * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    fidelity > 0.95 ? "bg-success" : fidelity > 0.8 ? "bg-warning" : "bg-destructive"
                  }`}
                  style={{ width: `${fidelity * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center">
            {isSuccess 
              ? "✓ Superdense coding successful!" 
              : "✗ Noise caused transmission error"}
          </div>
        </div>
      )}
    </Card>
  );
};
