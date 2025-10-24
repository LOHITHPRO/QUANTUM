import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BitSelector } from "@/components/BitSelector";
import { QuantumCircuit } from "@/components/QuantumCircuit";
import { NoiseControl } from "@/components/NoiseControl";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ProbabilityChart } from "@/components/ProbabilityChart";
import { Play, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [bits, setBits] = useState<[number, number]>([0, 0]);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sentBits, setSentBits] = useState<[number, number] | null>(null);
  const [receivedBits, setReceivedBits] = useState<[number, number] | null>(null);
  const [fidelity, setFidelity] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ noise: number; success: number }[]>([]);

  // Generate theoretical success probability data
  useEffect(() => {
    const generateChartData = () => {
      const data = [];
      for (let noise = 0; noise <= 50; noise += 2) {
        // Simplified model: success probability decreases with noise
        const errorProb = noise / 100;
        const successProb = Math.pow(1 - errorProb, 4); // 4 gates in protocol
        data.push({ noise, success: successProb });
      }
      return data;
    };
    setChartData(generateChartData());
  }, []);

  const runSimulation = async () => {
    setIsRunning(true);
    setSentBits(bits);
    toast("Running quantum simulation...");

    // Simulate the protocol with noise
    setTimeout(() => {
      // Simple noise model: each bit has errorProb chance of flipping
      const errorProb = noiseLevel / 100;
      let result: [number, number] = [...bits] as [number, number];
      
      // Apply noise to each bit independently
      if (Math.random() < errorProb) {
        result[0] = result[0] === 0 ? 1 : 0;
      }
      if (Math.random() < errorProb) {
        result[1] = result[1] === 0 ? 1 : 0;
      }

      // Calculate fidelity based on noise level
      const theoreticalFidelity = Math.pow(1 - errorProb, 4);
      
      setReceivedBits(result);
      setFidelity(theoreticalFidelity);
      setIsRunning(false);

      const isSuccess = bits[0] === result[0] && bits[1] === result[1];
      toast(isSuccess ? "Transmission successful!" : "Error detected in transmission");
    }, 4000); // Time for animation to complete
  };

  const reset = () => {
    setBits([0, 0]);
    setNoiseLevel(0);
    setSentBits(null);
    setReceivedBits(null);
    setFidelity(null);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Superdense Coding
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Send 2 classical bits using only 1 qubit through quantum entanglement
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <BitSelector bits={bits} onBitsChange={setBits} />
          <NoiseControl noiseLevel={noiseLevel} onNoiseChange={setNoiseLevel} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={runSimulation}
            disabled={isRunning}
            size="lg"
            className="bg-primary text-primary-foreground hover:shadow-quantum-strong transition-all"
          >
            <Play className="w-5 h-5 mr-2" />
            {isRunning ? "Running..." : "Run Simulation"}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="hover:border-primary"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Circuit Visualization */}
        <QuantumCircuit bits={bits} isRunning={isRunning} />

        {/* Results and Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          <ResultsDisplay 
            sentBits={sentBits} 
            receivedBits={receivedBits} 
            fidelity={fidelity}
          />
          <ProbabilityChart data={chartData} />
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-card/50 rounded-lg border border-border">
          <h3 className="text-lg font-bold mb-2 text-foreground">About Superdense Coding</h3>
          <p className="text-sm text-muted-foreground">
            Superdense coding is a quantum communication protocol that exploits quantum entanglement 
            to transmit two classical bits of information by sending only one qubit. Alice and Bob 
            share an entangled Bell pair, and Alice encodes her 2-bit message by applying local 
            operations (I, X, Z, or XZ gates) to her qubit. When Bob receives Alice's qubit, he 
            performs a Bell measurement on both qubits to decode the original message.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
