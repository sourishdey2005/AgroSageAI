import CropHealthRadar from '@/components/dashboard/crop-health-radar';
import DashboardTabs from '@/components/dashboard/dashboard-tabs';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Welcome, Farmer!
        </h1>
        <p className="text-muted-foreground">
          Here is an overview of your farm's current status.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <CropHealthRadar />
        </div>
      </div>
      <DashboardTabs />
    </div>
  );
}
