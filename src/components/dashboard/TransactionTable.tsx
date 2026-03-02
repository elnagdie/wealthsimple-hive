import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check } from 'lucide-react';
import { PersonaData, CATEGORIES, Transaction } from '@/data/personas';
import { toast } from 'sonner';

interface Props {
  data: PersonaData;
}

const TransactionTable = ({ data }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>(data.transactions);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [alwaysCategorize, setAlwaysCategorize] = useState(false);

  // Reset transactions when persona changes
  const [prevName, setPrevName] = useState(data.name);
  if (data.name !== prevName) {
    setPrevName(data.name);
    setTransactions(data.transactions);
    setEditingIdx(null);
  }

  const handleCategoryChange = (idx: number, newCategory: string) => {
    const tx = transactions[idx];
    const wasIncome = tx.category.includes('Income');
    const isNowTransfer = newCategory === 'Transfer/Reimbursement';

    setTransactions((prev) =>
      prev.map((t, i) =>
        i === idx ? { ...t, category: newCategory, confidence: 'high' as const } : t
      )
    );
    setEditingIdx(null);

    toast.success('✓ Learned — future transactions from this merchant will be categorized automatically');

    if (wasIncome && isNowTransfer) {
      toast.info('ⓘ Recalculating... This changes your income estimate and safe-to-allocate amount.');
    }
  };

  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 font-medium">Date</th>
              <th className="text-left py-2 font-medium">Description</th>
              <th className="text-right py-2 font-medium">Amount</th>
              <th className="text-left py-2 font-medium pl-4">Category</th>
              <th className="text-center py-2 font-medium w-8"></th>
              <th className="text-center py-2 font-medium w-8"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={idx}
                className={`border-b border-border/50 ${
                  tx.confidence === 'medium' ? 'bg-warning/5' : ''
                }`}
              >
                <td className="py-2.5 text-muted-foreground">{tx.date}</td>
                <td className="py-2.5 text-foreground">{tx.description}</td>
                <td className={`py-2.5 text-right tabular-nums font-medium ${
                  tx.amount > 0 ? 'text-primary' : 'text-foreground'
                }`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                </td>
                <td className="py-2.5 pl-4">
                  {editingIdx === idx ? (
                    <div className="space-y-2">
                      <select
                        defaultValue=""
                        onChange={(e) => handleCategoryChange(idx, e.target.value)}
                        className="text-xs px-2 py-1 border border-input rounded bg-card text-foreground"
                        autoFocus
                      >
                        <option value="" disabled>Select category...</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={alwaysCategorize}
                          onChange={(e) => setAlwaysCategorize(e.target.checked)}
                          className="rounded border-input"
                        />
                        Always categorize this merchant
                      </label>
                    </div>
                  ) : (
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                      tx.category.includes('?')
                        ? 'bg-secondary text-foreground border-[1.5px] border-warning'
                        : 'bg-secondary text-foreground'
                    }`}>
                      {tx.category}
                    </span>
                  )}
                </td>
                <td className="py-2.5 text-center">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    tx.confidence === 'high' ? 'bg-primary' : 'bg-warning'
                  }`} />
                </td>
                <td className="py-2.5 text-center">
                  {tx.confidence === 'medium' && editingIdx !== idx && (
                    <button
                      onClick={() => setEditingIdx(idx)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionTable;
