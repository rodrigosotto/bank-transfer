import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../store/accountSlice";
import { createAccountApi, checkAccountNameExistsApi } from "../api/api";
import { AppDispatch } from "../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AccountFormProps {
  onBack: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ onBack }) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<string>("0"); // string
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericBalance = parseFloat(balance.replace(/\D/g, ""));

    if (name.trim() && numericBalance >= 0) {
      try {
        const nameExists = await checkAccountNameExistsApi(name);

        if (nameExists) {
          toast.warn("Este nome de conta já existe. Por favor, escolha outro.");
          return;
        }

        const newAccount = await createAccountApi({
          name,
          balance: numericBalance,
        });
        dispatch(createAccount(newAccount));
        toast.success("Conta criada com sucesso!");
        setName("");
        setBalance("0");
      } catch (error) {
        toast.error("Erro ao criar a conta.");
      }
    } else {
      toast.warn("Por favor, preencha todos os campos corretamente.");
    }
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setBalance(value);
  };

  // Formatar o valor como moeda
  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Criar Conta
        </h2>

        <div className="flex flex-col">
          <label htmlFor="accountName" className="text-gray-300 mb-1">
            Nome do usuário:
          </label>
          <input
            id="accountName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do usuário"
            className="border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="accountBalance" className="text-gray-300 mb-1">
            Adicionar Saldo Inicial:
          </label>
          <input
            id="accountBalance"
            type="text"
            value={balance === "0" ? "" : formatCurrency(balance)}
            onChange={handleBalanceChange}
            placeholder="Digite o saldo inicial"
            className="border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Criar Conta
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Ver Opções
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AccountForm;
