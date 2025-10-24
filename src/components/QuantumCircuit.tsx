import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface QuantumCircuitProps {
  bits: [number, number];
  isRunning: boolean;
}

export const QuantumCircuit = ({ bits, isRunning }: QuantumCircuitProps) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setAnimationStep(0);
      return;
    }

    const steps = 5; // Bell prep, Alice encoding, Bob decoding, measure
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % (steps + 1);
      setAnimationStep(currentStep);
      if (currentStep === 0) {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, bits]);

  const getAliceGate = () => {
    const [b0, b1] = bits;
    if (b0 === 0 && b1 === 0) return "I";
    if (b0 === 0 && b1 === 1) return "X";
    if (b0 === 1 && b1 === 0) return "Z";
    return "XZ";
  };

  const renderGate = (gate: string, active: boolean) => (
    <div
      className={`w-12 h-12 border-2 rounded flex items-center justify-center font-bold transition-all ${
        active
          ? "border-primary bg-primary/20 text-primary shadow-quantum animate-pulse-quantum"
          : "border-border text-muted-foreground"
      }`}
    >
      {gate}
    </div>
  );

  const renderQubitLine = (qubitLabel: string, gates: React.ReactNode[]) => (
    <div className="flex items-center gap-4">
      <div className="w-16 text-right font-mono text-sm text-muted-foreground">
        {qubitLabel}
      </div>
      <div className="flex-1 h-0.5 bg-border" />
      {gates.map((gate, i) => (
        <div key={i} className="flex items-center gap-4">
          {gate}
          <div className="flex-1 h-0.5 bg-border min-w-8" />
        </div>
      ))}
      <div className="w-12 h-12 border-2 border-dashed border-border rounded flex items-center justify-center">
        <span className="text-xs text-muted-foreground">M</span>
      </div>
    </div>
  );

  return (
    <Card className="p-8 bg-card border-border shadow-quantum overflow-x-auto">
      <h2 className="text-xl font-bold mb-6 text-foreground">Quantum Circuit</h2>
      <div className="space-y-8 min-w-[800px]">
        {/* Qubit 0 (Alice's) */}
        {renderQubitLine("|0⟩₀", [
          renderGate("H", animationStep === 1),
          <div key="cnot-control" className="relative">
            <div
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                animationStep === 2
                  ? "border-primary bg-primary shadow-quantum"
                  : "border-border"
              }`}
            />
            <div className={`absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 ${
              animationStep === 2 ? "bg-primary" : "bg-border"
            }`} />
          </div>,
          renderGate(getAliceGate(), animationStep === 3),
          <div key="cnot2-target" className="relative">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                animationStep === 4
                  ? "border-primary text-primary shadow-quantum"
                  : "border-border text-muted-foreground"
              }`}
            >
              ⊕
            </div>
            <div className={`absolute bottom-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 ${
              animationStep === 4 ? "bg-primary" : "bg-border"
            }`} />
          </div>,
          renderGate("H", animationStep === 5),
        ])}

        {/* Qubit 1 (Bob's) */}
        {renderQubitLine("|0⟩₁", [
          <div key="spacer1" className="w-12" />,
          <div key="cnot-target" className="relative">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                animationStep === 2
                  ? "border-primary text-primary shadow-quantum"
                  : "border-border text-muted-foreground"
              }`}
            >
              ⊕
            </div>
          </div>,
          <div key="spacer2" className="w-12" />,
          <div key="cnot2-control" className="relative">
            <div
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                animationStep === 4
                  ? "border-primary bg-primary shadow-quantum"
                  : "border-border"
              }`}
            />
          </div>,
          <div key="spacer3" className="w-12" />,
        ])}
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        {animationStep === 0 && "Ready to transmit"}
        {animationStep === 1 && "Creating Bell state: Hadamard on qubit 0"}
        {animationStep === 2 && "Creating Bell state: CNOT(0→1)"}
        {animationStep === 3 && `Alice encoding: ${getAliceGate()} gate`}
        {animationStep === 4 && "Bob decoding: CNOT(0→1)"}
        {animationStep === 5 && "Bob decoding: Hadamard on qubit 0"}
      </div>
    </Card>
  );
};
