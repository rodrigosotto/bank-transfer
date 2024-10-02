import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferFundsApi } from "../api/api";
import { createTransaction, updateBalance } from "../store/accountSlice";
import { RootState } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FundTransferProps {
  onBack: () => void;
}

const TransferForm: React.FC<FundTransferProps> = ({ onBack }) => {
  const [accountFrom, setAccountFrom] = useState<number | null>(null);
  const [accountTo, setAccountTo] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  useEffect(() => {}, [accounts]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accountFrom && accountTo && amount > 0) {
      try {
        const response = await transferFundsApi({
          account_from: accountFrom,
          account_to: accountTo,
          amount,
        });

        if (response.message) {
          // Criar transação
          dispatch(
            createTransaction({
              senderId: accountFrom,
              receiverId: accountTo,
              amount,
            })
          );

          // Atualizar saldo localmente
          const fromBalance =
            Number(accounts.find((a) => a.id === accountFrom)?.balance) -
            amount;
          const toBalance =
            Number(accounts.find((a) => a.id === accountTo)?.balance) + amount;

          dispatch(updateBalance({ id: accountFrom, newBalance: fromBalance }));
          dispatch(updateBalance({ id: accountTo, newBalance: toBalance }));

          // Notificar sucesso
          toast.success("Transferência realizada com sucesso!");

          // Resetar campos
          setAccountFrom(null);
          setAccountTo(null);
          setAmount(0);
        }
      } catch (error: any) {
        if (error.response) {
          toast.error(
            `Erro: ${error.response.data.message || "Erro desconhecido."}`
          );
        } else {
          toast.error("Erro de rede ou servidor.");
        }
      }
    }
  };

  const getUniqueAccounts = (excludeId: number | null) => {
    const uniqueAccounts = accounts.filter(
      (account, index, self) =>
        index === self.findIndex((a) => a.id === account.id)
    );

    return uniqueAccounts.filter((account) => account.id !== excludeId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleTransfer}
        className="bg-gray-800 shadow-lg rounded-lg px-8 py-6 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Transferir Fundos
        </h2>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Conta de Origem
          </label>
          <select
            value={accountFrom ?? ""}
            onChange={(e) => {
              setAccountFrom(Number(e.target.value));
              setAccountTo(null); // Reseta a conta de destino quando a origem mudar
            }}
            className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecione a conta de origem
            </option>
            {getUniqueAccounts(null).map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Conta de Destino
          </label>
          <select
            value={accountTo ?? ""}
            onChange={(e) => setAccountTo(Number(e.target.value))}
            className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecione a conta de destino
            </option>
            {getUniqueAccounts(accountFrom).map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Valor a Transferir
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Valor"
            className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          Transferir
        </button>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 w-full bg-slate-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Ver opções
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TransferForm;
