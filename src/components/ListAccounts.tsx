import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Account } from "./../types/types";

interface ListAccountsProps {
  onBack: () => void;
}

const ListAccounts: React.FC<ListAccountsProps> = ({ onBack }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/accounts");
        const updatedAccounts = response.data.map((account: Account) => ({
          ...account,
          balance: (parseFloat(account.balance as string) / 100).toFixed(2),
        }));

        setAccounts(updatedAccounts);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };

    fetchAccounts();
    const socket = io("http://localhost:3000");

    socket.on("transfer", (data) => {
      setAccounts((prevAccounts) => {
        return prevAccounts.map((account) => {
          if (account.id === data.account_from) {
            const currentBalance =
              typeof account.balance === "string"
                ? parseFloat(account.balance)
                : account.balance;
            // Divide o saldo por 100 antes de subtrair o valor da transferência
            return {
              ...account,
              balance: (currentBalance - data.amount / 100).toFixed(2),
            };
          }

          if (account.id === data.account_to) {
            return {
              ...account,
              balance: (
                parseFloat(account.balance as string) +
                data.amount / 100
              ).toFixed(2),
            };
          }
          return account;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-2xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Contas Bancarias
        </h2>
        <ul className="space-y-4">
          {accounts.length === 0 ? (
            <li className="border border-gray-600 p-4 rounded bg-gray-700 hover:shadow-md transition-shadow duration-200">
              {" "}
              Nenhuma conta encontrada.
            </li>
          ) : (
            accounts.map((account) => (
              <li
                key={account.id}
                className="border border-gray-600 p-4 rounded bg-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-semibold text-white">
                  {account.name}:{" "}
                </span>
                <span className="font-semibold text-blue-400">
                  R${" "}
                  {account.balance !== null
                    ? parseFloat(account.balance as string).toFixed(2)
                    : "Saldo inválido"}
                </span>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={onBack}
          className="mt-4 w-full bg-slate-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Ver Opções
        </button>
      </div>
    </div>
  );
};

export default ListAccounts;
