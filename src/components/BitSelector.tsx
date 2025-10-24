import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BitSelectorProps {
  bits: [number, number];
  onBitsChange: (bits: [number, number]) => void;
}

export const BitSelector = ({ bits, onBitsChange }: BitSelectorProps) => {
  const toggleBit = (index: 0 | 1) => {
    const newBits: [number, number] = [...bits] as [number, number];
    newBits[index] = bits[index] === 0 ? 1 : 0;
    onBitsChange(newBits);
  };

  return (
    <Card className="p-6 bg-card border-border shadow-quantum">
      <h2 className="text-xl font-bold mb-4 text-foreground">Alice's Message</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select 2 classical bits to send using 1 qubit
      </p>
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Bit 0</span>
          <Button
            onClick={() => toggleBit(0)}
            variant={bits[0] === 1 ? "default" : "outline"}
            className={`w-16 h-16 text-2xl font-bold transition-all ${
              bits[0] === 1 
                ? "bg-primary text-primary-foreground shadow-quantum" 
                : "hover:border-primary"
            }`}
          >
            {bits[0]}
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Bit 1</span>
          <Button
            onClick={() => toggleBit(1)}
            variant={bits[1] === 1 ? "default" : "outline"}
            className={`w-16 h-16 text-2xl font-bold transition-all ${
              bits[1] === 1 
                ? "bg-primary text-primary-foreground shadow-quantum" 
                : "hover:border-primary"
            }`}
          >
            {bits[1]}
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">Message: </span>
        <span className="text-lg font-mono font-bold text-primary">
          {bits[0]}{bits[1]}
        </span>
      </div>
    </Card>
  );
};
