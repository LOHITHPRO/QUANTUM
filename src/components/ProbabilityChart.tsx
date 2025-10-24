import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProbabilityChartProps {
  data: { noise: number; success: number }[];
}

export const ProbabilityChart = ({ data }: ProbabilityChartProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-quantum">
      <h2 className="text-xl font-bold mb-4 text-foreground">Success Probability vs Noise</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="noise" 
            label={{ value: 'Noise Level (%)', position: 'insideBottom', offset: -5 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            label={{ value: 'Success Probability', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--muted-foreground))"
            domain={[0, 1]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            formatter={(value: number) => [(value * 100).toFixed(1) + "%", "Success Rate"]}
          />
          <Line 
            type="monotone" 
            dataKey="success" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
