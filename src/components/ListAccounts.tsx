import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Account } from "./../types/types";

const ListAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/accounts");
        const updatedAccounts = response.data.map((account: Account) => ({
          ...account,
          balance: parseFloat(account.balance as string).toFixed(2),
        }));

        setAccounts(updatedAccounts);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };

    fetchAccounts();

    // Conectar ao Socket.IO
    const socket = io("http://localhost:3000");

    // Ouvir eventos de transferência
    socket.on("transfer", (data) => {
      console.log("Transferência recebida:", data);
      // Atualizar as contas após a transferência
      setAccounts((prevAccounts) => {
        return prevAccounts.map((account) => {
          // Se a conta for a de origem, subtrai o valor transferido
          if (account.id === data.account_from) {
            const currentBalance =
              typeof account.balance === "string"
                ? parseFloat(account.balance)
                : account.balance;
            return {
              ...account,
              balance: currentBalance - data.amount, // Faz a subtração com balance como number
            };
          }

          // Se a conta for a de destino, adiciona o valor transferido
          if (account.id === data.account_to) {
            return {
              ...account,
              balance: account.balance + data.amount, // continua como number
            };
          }
          return account; // Retorna a conta inalterada
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Contas Bancárias</h2>
      <ul>
        {accounts.length === 0 ? (
          <li>Nenhuma conta encontrada.</li>
        ) : (
          accounts.map((account) => (
            <li key={account.id}>
                <strong>{account.name}</strong>:R$ {" "}
                {account.balance !== null
                    ? parseFloat(account.balance as string).toFixed(2) // converte para número e formata
                    : "Saldo inválido"}
            </li>
        ))
        
        )}
      </ul>
    </div>
  );
};

export default ListAccounts;
