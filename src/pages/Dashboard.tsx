import { usePersona } from '@/context/PersonaContext';
import HeaderBar from '@/components/dashboard/HeaderBar';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import AskHive from '@/components/dashboard/AskHive';
import ReasoningPanel from '@/components/dashboard/ReasoningPanel';
import AccountCards from '@/components/dashboard/AccountCards';
import SpendingBreakdown from '@/components/dashboard/SpendingBreakdown';
import TransactionTable from '@/components/dashboard/TransactionTable';
import ScenarioExplorer from '@/components/dashboard/ScenarioExplorer';
import TrustFooter from '@/components/dashboard/TrustFooter';

const Dashboard = () => {
  const { data } = usePersona();

  return (
    <div className="min-h-screen bg-secondary/50">
      <HeaderBar />
      <main className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">
        <RecommendationCard data={data} />
        <AskHive data={data} />
        <ReasoningPanel data={data} />
        <AccountCards data={data} />
        <SpendingBreakdown data={data} />
        <TransactionTable data={data} />
        <ScenarioExplorer data={data} />
        <TrustFooter data={data} />
      </main>
    </div>
  );
};

export default Dashboard;
