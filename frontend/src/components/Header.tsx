import { ConnectButton } from "thirdweb/react";
import { client, rootstockTestnet, wallets } from "@/lib/config";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6 border-b border-border bg-secondary">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Micro-Savings Pool
        </h1>
        <ConnectButton 
          client={client}
          chain={rootstockTestnet}
          wallets={wallets}
        />
      </div>
    </header>
  );
};

export default Header;
