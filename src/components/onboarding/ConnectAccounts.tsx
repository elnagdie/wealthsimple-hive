import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Upload } from 'lucide-react';

interface Props {
  onContinue: () => void;
}

const ConnectAccounts = ({ onContinue }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleAuthorize = () => {
    setShowModal(false);
    setConnected(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-foreground mb-2">See your full financial picture</h1>
      <p className="text-muted-foreground mb-8">The more accounts connected, the smarter your recommendations.</p>

      {/* Open Banking Card */}
      <div className="border border-border rounded-lg p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Open Banking</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm font-medium text-muted-foreground">
          <span>TD</span><span className="text-border">|</span>
          <span>RBC</span><span className="text-border">|</span>
          <span>Scotiabank</span><span className="text-border">|</span>
          <span>CIBC</span><span className="text-border">|</span>
          <span>BMO</span>
        </div>

        {!connected ? (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity mb-3"
            >
              Connect securely →
            </button>
            <p className="text-xs text-muted-foreground mb-2">Read-only access. We never see your password.</p>
            <span className="inline-block text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
              🇨🇦 Consumer-Driven Banking Act — Launching 2026
            </span>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-primary font-medium"
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
            2 accounts connected (847 transactions imported)
          </motion.div>
        )}
      </div>

      {/* CSV Upload */}
      <div className="border border-dashed border-border rounded-lg p-5 mb-8">
        <p className="text-sm text-muted-foreground mb-2">Or upload bank statements manually</p>
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <Upload className="w-4 h-4" />
          Drag CSV files here or browse
        </div>
        <p className="text-xs text-muted-foreground">Supports TD, RBC, Scotiabank, CIBC, BMO statement formats</p>
      </div>

      {connected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={onContinue}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Continue →
          </button>
        </motion.div>
      )}

      {/* Authorization Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-8 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Authorize Wealthsimple</h2>
              </div>

              <p className="text-sm text-muted-foreground mb-4">Allow read-only access to:</p>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Transaction history (24 months)', checked: true },
                  { label: 'Account balances', checked: true },
                  { label: 'Recurring payment patterns', checked: true },
                  { label: 'Payment initiation (coming 2027)', checked: false },
                ].map((item) => (
                  <label key={item.label} className="flex items-center gap-3 text-sm">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      item.checked ? 'bg-primary border-primary' : 'border-border'
                    }`}>
                      {item.checked && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className={item.checked ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span>
                  </label>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                Your data is encrypted and you can revoke access at any time.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleAuthorize}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Authorize
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectAccounts;
