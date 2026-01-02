import { useMemo } from 'react';
import { FinancialInputs, CalculatedMetrics, PROJECT_SPECS } from '@/types/presentation';

export function useFinancialCalculator(inputs: FinancialInputs): CalculatedMetrics {
  return useMemo(() => {
    const { projectCost, tariffRate, equityPercent, interestRate, loanTenureMonths, oaChargesMode, oaChargesEstimate } = inputs;
    
    // Core calculations
    const equityAmount = (projectCost * equityPercent) / 100;
    const loanAmount = projectCost - equityAmount;
    
    // EMI calculation using reducing balance method
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenureMonths;
    const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Generate EMI Schedule (yearly)
    const emiSchedule: CalculatedMetrics['emiSchedule'] = [];
    let balance = loanAmount;
    const loanTenureYears = Math.ceil(loanTenureMonths / 12);
    
    for (let year = 1; year <= loanTenureYears; year++) {
      const monthsInYear = year === loanTenureYears && loanTenureMonths % 12 !== 0 
        ? loanTenureMonths % 12 
        : 12;
      
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      const openingBalance = balance;
      
      for (let month = 0; month < monthsInYear && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyEMI - interestPayment, balance);
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }
      
      emiSchedule.push({
        year,
        openingBalance,
        emi: monthlyEMI * monthsInYear,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        closingBalance: Math.max(0, balance),
      });
    }
    
    const totalRepayment = emiSchedule.reduce((sum, row) => sum + row.emi, 0);
    const totalInterest = emiSchedule.reduce((sum, row) => sum + row.interest, 0);
    const annualEMI = monthlyEMI * 12;
    
    // Generation & Revenue
    const annualGeneration = PROJECT_SPECS.capacity * PROJECT_SPECS.unitsPerMW;
    const grossRevenue = (annualGeneration * tariffRate) / 100000; // in lakhs
    
    // Net revenue calculation
    let oaCharges = 0;
    if (oaChargesMode === 'estimated') {
      oaCharges = (annualGeneration * oaChargesEstimate) / 100000; // in lakhs
    }
    const netRevenue = grossRevenue - oaCharges;
    
    // Post-loan cash flow (after loan closure)
    const amcCost = (annualGeneration * 0.40) / 100000; // ₹0.40/unit AMC
    const postLoanCashFlow = netRevenue - amcCost;
    
    // Depreciation calculations (40% accelerated depreciation for solar)
    const depreciableAmount = projectCost; // in lakhs
    const year1Depreciation = depreciableAmount * 0.40; // 40% in year 1
    const remainingAfterYear1 = depreciableAmount - year1Depreciation;
    const year2Depreciation = remainingAfterYear1 * 0.40; // 40% WDV
    const remainingDepreciation = remainingAfterYear1 - year2Depreciation;
    const taxRate = 0.30; // Assuming 30% tax rate
    const totalDepreciationBenefit = (year1Depreciation + year2Depreciation) * taxRate;
    
    // Land appreciation calculations
    const landAcres = 5.5; // Average of 5-6 acres
    const landCost = landAcres * PROJECT_SPECS.landCostPerAcre;
    const appreciationRate = PROJECT_SPECS.landAppreciationRate / 100;
    const landValueYear10 = landCost * Math.pow(1 + appreciationRate, 10);
    const landValueYear20 = landCost * Math.pow(1 + appreciationRate, 20);
    const landValueYear30 = landCost * Math.pow(1 + appreciationRate, 30);
    
    // Breakeven calculation
    const loanYears = loanTenureMonths / 12;
    const annualNetDuringLoan = netRevenue - annualEMI;
    
    let breakEvenYear: number;
    if (annualNetDuringLoan >= equityAmount / loanYears) {
      breakEvenYear = Math.ceil(equityAmount / netRevenue);
    } else {
      const cumulativeDuringLoan = annualNetDuringLoan * loanYears;
      const remainingToRecover = equityAmount - cumulativeDuringLoan;
      const yearsAfterLoan = remainingToRecover > 0 ? remainingToRecover / postLoanCashFlow : 0;
      breakEvenYear = Math.ceil(loanYears + yearsAfterLoan);
    }
    breakEvenYear = Math.max(1, Math.min(breakEvenYear, 15));
    
    // IRR estimation with depreciation benefit considered
    const effectiveEquity = equityAmount - totalDepreciationBenefit;
    const totalCashFlows = (netRevenue - annualEMI) * loanYears + postLoanCashFlow * (PROJECT_SPECS.projectLifeYears - loanYears);
    const avgAnnualReturn = totalCashFlows / PROJECT_SPECS.projectLifeYears;
    const simpleROI = ((avgAnnualReturn / effectiveEquity) * 100);
    
    const equityIRR = {
      min: Math.max(15, Math.round(simpleROI * 0.8)),
      max: Math.min(35, Math.round(simpleROI * 1.1)),
    };
    
    return {
      equityAmount,
      loanAmount,
      totalInterest,
      totalRepayment,
      monthlyEMI,
      annualGeneration,
      grossRevenue,
      netRevenue,
      annualEMI,
      postLoanCashFlow,
      breakEvenYear,
      equityIRR,
      year1Depreciation,
      year2Depreciation,
      remainingDepreciation,
      totalDepreciationBenefit,
      landCost,
      landValueYear10,
      landValueYear20,
      landValueYear30,
      emiSchedule,
    };
  }, [inputs]);
}
