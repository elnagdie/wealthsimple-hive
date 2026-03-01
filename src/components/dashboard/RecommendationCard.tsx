import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonaData } from '@/data/personas';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  data: PersonaData;
}

const AnimatedNumber = ({ value, prefix = '$' }: { value: number; prefix?: string }) => (
  <motion.span
    key={value}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    {prefix}{value.toLocaleString()}
  </motion.span>
);

const RecommendationCard = ({ data }: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const maxIncome = Math.max(...data.incomeHistory);

  return (
    <>
      <motion.div
        key={data.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-xl border border-border shadow-sm p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{data.cardHeader}</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                Income Pattern: {data.incomeType === 'variable' ? 'Variable' : 'Steady'}
                {data.incomeVariance && ` (${data.incomeVariance})`}
                <span className={`inline-block w-2 h-2 rounded-full ${data.incomeType === 'variable' ? 'bg-warning' : 'bg-primary'}`} />
              </span>
              <span className="flex items-center gap-1">
                Confidence: {data.confidence}
                <span className="flex gap-0.5 ml-1">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i <= data.confidenceDots ? 'bg-foreground' : 'bg-border'}`} />
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* A) Income Summary */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Income Summary</h3>
          <p className="text-foreground">
            {data.incomeType === 'variable'
              ? <>Income this month (so far): <strong>${data.incomeThisMonth.toLocaleString()}</strong></>
              : <>Paycheque received: <strong>${data.incomeThisMonth.toLocaleString()}</strong> ({data.incomeDetail})</>
            }
          </p>
          {data.incomeType === 'variable' && (
            <>
              <p className="text-sm text-muted-foreground mt-1">{data.incomeDetail}</p>
              <p className="text-sm text-muted-foreground">6-month range: {data.incomeRange}</p>
              <p className="text-sm text-muted-foreground">Conservative estimate used: {data.conservativeLabel}</p>
            </>
          )}

          {/* Sparkline */}
          <div className="flex items-end gap-1.5 mt-3 h-12">
            {data.incomeHistory.map((val, i) => {
              const height = (val / maxIncome) * 100;
              const isAboveConservative = val >= data.conservativeEstimate;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all ${isAboveConservative ? 'bg-primary' : 'bg-warning'}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* B) Obligations */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Obligations ({data.obligationHorizon})
          </h3>
          <div className="space-y-1.5">
            {data.obligations.map((ob) => (
              <div key={ob.name} className={`flex justify-between text-sm ${ob.isWarning ? 'text-warning font-medium' : 'text-foreground'}`}>
                {ob.isWarning ? (
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <span>⚠️ {ob.name}</span>
                      {ob.warningNote && <span className="text-xs text-muted-foreground ml-2">— {ob.warningNote}</span>}
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">{ob.tooltipText}</TooltipContent>
                  </Tooltip>
                ) : (
                  <span>{ob.name}</span>
                )}
                <span className="text-muted-foreground tabular-nums">${ob.amount.toLocaleString()} — {ob.date}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-2 text-sm text-muted-foreground">
            Total: ${data.obligationTotal.toLocaleString()}
            {data.obligationReserve ? ` + $${data.obligationReserve} reserve = $${(data.obligationTotal + data.obligationReserve).toLocaleString()}` : ''}
          </div>
        </div>

        {/* C) Recommendation */}
        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-4xl font-bold text-primary mb-1">
            <AnimatedNumber value={data.safeToAllocate} />
            <span className="text-lg font-normal text-foreground ml-2">safe to allocate{data.incomeType === 'variable' ? ' this week' : ''}</span>
          </p>
          {data.allocateRange && (
            <p className="text-sm text-muted-foreground mb-4">Range: {data.allocateRange}</p>
          )}

          <div className="space-y-3 mt-4">
            {data.allocations.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <span>{a.icon}</span>
                <div>
                  <span className="font-semibold text-foreground">${a.amount} → {a.account}</span>
                  {a.reason && <span className="text-sm text-muted-foreground ml-1">— {a.reason}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1">
            {data.infoLines.map((line, i) => (
              <p key={i} className="text-xs text-muted-foreground">ⓘ {line}</p>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Move ${data.safeToAllocate} →
          </button>
          <button className="px-6 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
            Adjust amounts
          </button>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-8 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-foreground mb-2">Confirm Transfer — This is where you decide.</h2>
              <p className="text-sm text-muted-foreground mb-4">
                The AI recommends this allocation, but you're in control. In production, this initiates the transfer to your accounts.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                <strong>Reason:</strong> Moving money is a human decision. The AI can't see life events, changing plans, or how you feel about risk this week.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium"
                >
                  Not right now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecommendationCard;
