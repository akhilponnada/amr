import { TrendingDown, Calculator, Percent, IndianRupee } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export function DepreciationSlide({ inputs, metrics, isActive }: SlideProps) {
  const depreciationData = [
    { name: 'Year 1', value: metrics.year1Depreciation, fill: 'hsl(var(--primary))' },
    { name: 'Year 2', value: metrics.year2Depreciation, fill: 'hsl(var(--secondary))' },
    { name: 'Remaining', value: metrics.remainingDepreciation, fill: 'hsl(var(--muted))' },
  ];

  const wdvSchedule = [
    { year: 'Start', wdv: inputs.projectCost, depreciation: 0, rate: '-' },
    { year: 'Year 1', wdv: inputs.projectCost - metrics.year1Depreciation, depreciation: metrics.year1Depreciation, rate: '40%' },
    { year: 'Year 2', wdv: inputs.projectCost - metrics.year1Depreciation - metrics.year2Depreciation, depreciation: metrics.year2Depreciation, rate: '40%' },
  ];

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Depreciation Schedule
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Accelerated depreciation benefits under Income Tax Act
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Chart & Summary */}
          <div className="space-y-6">
            {/* Depreciation Chart */}
            <div className="p-6 rounded-xl bg-card border animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                Depreciation Breakdown
              </h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={depreciationData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `₹${v}L`} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {depreciationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Percent className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">40%</p>
                <p className="text-sm text-muted-foreground">Depreciation Rate (WDV)</p>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <IndianRupee className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-2xl font-bold">₹{metrics.totalDepreciationBenefit.toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Total Tax Benefit</p>
              </div>
            </div>
          </div>

          {/* Right - WDV Schedule Table */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 rounded-xl bg-card border">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" />
                Written Down Value Schedule
              </h4>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-semibold">Period</th>
                    <th className="text-right py-3 text-sm font-semibold">WDV (₹L)</th>
                    <th className="text-right py-3 text-sm font-semibold">Depreciation</th>
                    <th className="text-right py-3 text-sm font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {wdvSchedule.map((row, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 font-medium">{row.year}</td>
                      <td className="py-3 text-right">₹{row.wdv.toFixed(1)}</td>
                      <td className="py-3 text-right font-semibold text-primary">
                        {row.depreciation > 0 ? `₹${row.depreciation.toFixed(1)}L` : '-'}
                      </td>
                      <td className="py-3 text-right text-muted-foreground">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Tax Benefit Calculation */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <h5 className="font-semibold text-sm mb-2">Tax Benefit Calculation (30% Tax Rate)</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Year 1 Tax Saving</span>
                    <span className="font-semibold">₹{(metrics.year1Depreciation * 0.30).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year 2 Tax Saving</span>
                    <span className="font-semibold">₹{(metrics.year2Depreciation * 0.30).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-semibold">Total Benefit</span>
                    <span className="font-bold text-primary">₹{metrics.totalDepreciationBenefit.toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 rounded-xl bg-muted/50 border animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Depreciation benefits reduce effective equity investment and improve project IRR. 
            Actual benefits depend on investor&apos;s tax profile. Consult tax advisors for specific calculations.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
