import { MapPin, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

export function LandAppreciationSlide({ metrics, isActive }: SlideProps) {
  const appreciationData = [
    { year: 0, value: metrics.landCost },
    { year: 5, value: metrics.landCost * Math.pow(1.08, 5) },
    { year: 10, value: metrics.landValueYear10 },
    { year: 15, value: metrics.landCost * Math.pow(1.08, 15) },
    { year: 20, value: metrics.landValueYear20 },
    { year: 25, value: metrics.landCost * Math.pow(1.08, 25) },
    { year: 30, value: metrics.landValueYear30 },
  ];

  const appreciationMultiple = (metrics.landValueYear30 / metrics.landCost).toFixed(1);
  const totalGain = metrics.landValueYear30 - metrics.landCost;

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Land Appreciation Analysis
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Additional wealth creation through land value growth over {PROJECT_SPECS.projectLifeYears} years
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Chart */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-card border animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Land Value Projection ({PROJECT_SPECS.landAppreciationRate}% CAGR)
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={appreciationData}>
                  <defs>
                    <linearGradient id="landGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    tickFormatter={(v) => `Y${v}`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tickFormatter={(v) => `₹${(v/100).toFixed(0)}Cr`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`₹${(value/100).toFixed(2)} Cr`, 'Land Value']}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#landGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right - Summary Cards */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Today</span>
              </div>
              <p className="text-2xl font-bold">₹{(metrics.landCost / 100).toFixed(2)} Cr</p>
              <p className="text-sm text-muted-foreground">{PROJECT_SPECS.landRequirement} @ ₹{PROJECT_SPECS.landCostPerAcre}L/acre</p>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-5 h-5 text-secondary" />
                <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">Year 10</span>
              </div>
              <p className="text-2xl font-bold">₹{(metrics.landValueYear10 / 100).toFixed(2)} Cr</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-secondary" />
                {((metrics.landValueYear10 / metrics.landCost - 1) * 100).toFixed(0)}% growth
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-solar-gold/10 to-solar-gold/5 border border-solar-gold/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-5 h-5 text-solar-gold" />
                <span className="text-xs px-2 py-1 rounded-full bg-solar-gold/10 text-solar-gold">Year 30</span>
              </div>
              <p className="text-2xl font-bold">₹{(metrics.landValueYear30 / 100).toFixed(2)} Cr</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-solar-gold" />
                {appreciationMultiple}x appreciation
              </p>
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-lg">Total Land Value Gain</h4>
              <p className="text-muted-foreground text-sm">Over {PROJECT_SPECS.projectLifeYears} year project life</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold text-primary">₹{(totalGain / 100).toFixed(2)} Cr</p>
              <p className="text-sm text-muted-foreground">Additional wealth creation</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          * Land appreciation assumed at {PROJECT_SPECS.landAppreciationRate}% CAGR based on historical trends. Actual values may vary.
        </div>
      </div>
    </SlideContainer>
  );
}
