import { useEffect, useState } from "react";
import AdminModal from "@/components/AdminModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SettingsModal() {
  const [threshold, setThreshold] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const ref = doc(db, "settings", "global");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as any;
        setThreshold(String(data.freeShippingThreshold ?? ""));
        setCurrency(String(data.currency ?? "USD"));
      }
    })();
  }, []);

  const save = async () => {
    setLoading(true);
    setMessage(null);
    const ref = doc(db, "settings", "global");
    await setDoc(
      ref,
      {
        freeShippingThreshold: parseFloat(threshold || "0"),
        currency,
        updatedAt: new Date(),
      },
      { merge: true },
    );
    setLoading(false);
    setMessage("Settings saved");
  };

  return (
    <AdminModal triggerLabel="Store Settings" title="Store Settings">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Free shipping threshold</label>
          <Input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="e.g. 50"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Currency</label>
          <Input
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="USD"
          />
        </div>
        {message && <p className="text-sm text-primary">{message}</p>}
        <Button size="sm" onClick={save} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </AdminModal>
  );
}
