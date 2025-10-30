import { useState } from "react";
import Header from "@/components/Header";
import PoolCard from "@/components/PoolCard";
import CreatePoolForm from "@/components/CreatePoolForm";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface Pool {
  name: string;
  description: string;
  target: number;
  current: number;
  recipient: string;
}

const Index = () => {
  const [pool, setPool] = useState<Pool | null>(null);

  const handleCreatePool = (newPool: Omit<Pool, "current">) => {
    setPool({ ...newPool, current: 0 });
    toast.success("Pool created successfully!");
  };

  const handleContribute = (amount: number) => {
    if (pool) {
      setPool({ ...pool, current: pool.current + amount });
      toast.success(`Contributed ${amount} RBTC to the pool!`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
        {pool ? (
          <PoolCard
            name={pool.name}
            description={pool.description}
            target={pool.target}
            current={pool.current}
            recipient={pool.recipient}
            onContribute={handleContribute}
          />
        ) : (
          <CreatePoolForm onCreatePool={handleCreatePool} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
