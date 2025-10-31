import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SavingsPoolModule", (m) => {
  const savingsPool = m.contract("SavingsPool");

  m.call(savingsPool, "incBy", [5n]);

  return { savingsPool };
});
