import DashboardTabs from '@/components/dashboard/dashboard-tabs';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        Welcome, Farmer!
      </h1>
      <DashboardTabs />
    </div>
  );
}
