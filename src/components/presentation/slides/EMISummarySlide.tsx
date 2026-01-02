import { Check, Calculator, IndianRupee, Percent } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';
import { cn } from '@/lib/utils';

export function EMISummarySlide({ inputs, metrics, isActive }: SlideProps) {
  const loanYears = inputs.loanTenureMonths / 12;

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          EMI Amortization Schedule
        </h2>
        <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Detailed year-wise loan repayment schedule over {loanYears.toFixed(1)} year tenure
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <IndianRupee className="w-4 h-4" />
              Loan Amount
            </div>
            <p className="text-xl font-bold">₹{metrics.loanAmount.toFixed(0)}L</p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Percent className="w-4 h-4" />
              Interest Rate
            </div>
            <p className="text-xl font-bold">{inputs.interestRate}%</p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Calculator className="w-4 h-4" />
              Monthly EMI
            </div>
            <p className="text-xl font-bold">₹{metrics.monthlyEMI.toFixed(2)}L</p>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <IndianRupee className="w-4 h-4" />
              Total Interest
            </div>
            <p className="text-xl font-bold text-secondary">₹{metrics.totalInterest.toFixed(1)}L</p>
          </div>
        </div>

        {/* EMI Table */}
        <div className="bg-card rounded-xl border overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">Year</th>
                  <th className="text-right p-4 font-semibold">Opening Balance (₹L)</th>
                  <th className="text-right p-4 font-semibold">Annual EMI (₹L)</th>
                  <th className="text-right p-4 font-semibold">Principal (₹L)</th>
                  <th className="text-right p-4 font-semibold">Interest (₹L)</th>
                  <th className="text-right p-4 font-semibold">Closing Balance (₹L)</th>
                </tr>
              </thead>
              <tbody>
                {metrics.emiSchedule.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'border-t transition-colors hover:bg-muted/30',
                      index === metrics.emiSchedule.length - 1 && 'bg-primary/5'
                    )}
                  >
                    <td className="p-4 font-medium">
                      <span className={cn(
                        'inline-flex items-center gap-1',
                        index === metrics.emiSchedule.length - 1 && 'text-primary'
                      )}>
                        {index === metrics.emiSchedule.length - 1 && <Check className="w-4 h-4" />}
                        Year {row.year}
                      </span>
                    </td>
                    <td className="p-4 text-right">{row.openingBalance.toFixed(2)}</td>
                    <td className="p-4 text-right font-semibold">{row.emi.toFixed(2)}</td>
                    <td className="p-4 text-right text-primary">{row.principal.toFixed(2)}</td>
                    <td className="p-4 text-right text-secondary">{row.interest.toFixed(2)}</td>
                    <td className="p-4 text-right font-semibold">{row.closingBalance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/70 border-t-2">
                  <td className="p-4 font-bold">Total</td>
                  <td className="p-4 text-right">-</td>
                  <td className="p-4 text-right font-bold">{metrics.totalRepayment.toFixed(2)}</td>
                  <td className="p-4 text-right font-bold text-primary">{metrics.loanAmount.toFixed(2)}</td>
                  <td className="p-4 text-right font-bold text-secondary">{metrics.totalInterest.toFixed(2)}</td>
                  <td className="p-4 text-right font-bold">0.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Loan Closure Note */}
        <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Check className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-primary">Loan Closure: Year {Math.ceil(loanYears)}</h4>
            <p className="text-muted-foreground text-sm">
              Post loan closure, full revenue (₹{metrics.postLoanCashFlow.toFixed(1)}L/year) flows to equity holders with minimal operational costs
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
