import { Target, Calendar, TrendingUp, IndianRupee, Clock } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function ROISlide({ inputs, metrics, isActive }: SlideProps) {
  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">ROI & Breakeven</h2>
        <p className="text-muted-foreground mb-8">Key investment return metrics</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard icon={<IndianRupee className="w-5 h-5" />} label="Equity Investment" value={`₹${(metrics.equityAmount / 100).toFixed(2)} Cr`} variant="primary" />
          <MetricCard icon={<Target className="w-5 h-5" />} label="Breakeven" value={`Year ${metrics.breakEvenYear}`} variant="accent" />
          <MetricCard icon={<Calendar className="w-5 h-5" />} label="Loan Closure" value={`Year ${(inputs.loanTenureMonths / 12).toFixed(1)}`} variant="default" />
          <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Equity IRR" value={`${metrics.equityIRR.min}–${metrics.equityIRR.max}%`} variant="secondary" />
        </div>
        <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-primary" />
            <p className="text-lg font-semibold">Asset Life: {PROJECT_SPECS.projectLifeYears}+ Years</p>
          </div>
          <p className="text-center text-muted-foreground">Predictable returns for {PROJECT_SPECS.projectLifeYears - Math.ceil(inputs.loanTenureMonths/12)} years after loan closure</p>
        </div>
      </div>
    </SlideContainer>
  );
}
