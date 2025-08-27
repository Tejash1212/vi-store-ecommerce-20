import AdminModal from "@/components/AdminModal";
import { Button } from "@/components/ui/button";

export default function SettingsModal() {
  return (
    <AdminModal triggerLabel="Store Settings" title="Store Settings">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Store-level configuration will be available here.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button size="sm">Manage Coupons</Button>
          <Button size="sm" variant="outline">
            Shipping Settings
          </Button>
        </div>
      </div>
    </AdminModal>
  );
}
