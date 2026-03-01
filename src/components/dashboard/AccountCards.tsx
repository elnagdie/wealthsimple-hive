import { motion } from 'framer-motion';
import { PersonaData } from '@/data/personas';
import { Check, Star } from 'lucide-react';

interface Props {
  data: PersonaData;
}

const AccountCards = ({ data }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Registered Accounts</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.accounts.map((acc) => (
          <motion.div
            key={acc.name + data.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-card rounded-xl border border-border p-5 ${
              acc.status === 'inactive' ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{acc.name}</h3>
              {acc.status === 'maxed' && <Check className="w-4 h-4 text-primary" />}
              {acc.status === 'complete' && <Check className="w-4 h-4 text-primary" />}
              {acc.highlight && acc.status === 'active' && <Star className="w-4 h-4 text-warning" />}
            </div>

            {/* Progress bar */}
            {acc.status !== 'inactive' && (
              <div className="w-full h-2 bg-secondary rounded-full mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    acc.status === 'maxed' || acc.status === 'complete'
                      ? 'bg-primary'
                      : acc.type === 'emergency' && acc.progressPercent < 50
                      ? 'bg-warning'
                      : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(acc.progressPercent, 100)}%` }}
                />
              </div>
            )}

            <div className="space-y-1 text-sm">
              {acc.status === 'inactive' ? (
                <p className="text-muted-foreground">{acc.detail}</p>
              ) : (
                <>
                  <p className="text-foreground">
                    {acc.status === 'maxed'
                      ? `$${acc.contributed.toLocaleString()} / $${acc.room.toLocaleString()} — MAXED ✓`
                      : acc.status === 'complete'
                      ? `$${acc.contributed.toLocaleString()} / $${acc.room.toLocaleString()} — COMPLETE ✓`
                      : `$${acc.contributed.toLocaleString()} / $${acc.room.toLocaleString()}`
                    }
                  </p>
                  {acc.note && <p className="text-muted-foreground text-xs">{acc.note}</p>}
                  <p className="text-muted-foreground text-xs">Balance: ${acc.balance.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs">{acc.detail}</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AccountCards;
