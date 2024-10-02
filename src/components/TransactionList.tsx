import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { listAccountsApi } from "../api/api";
import { createAccount } from "../store/accountSlice";
import { Account, Transaction } from "./../types/types";

interface TransactionListProps {
  onBack: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({}) => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.accounts.transactions
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountData: Account[] = await listAccountsApi();

      accountData.forEach((account) => {
        const exists = accounts.find((acc) => acc.id === account.id);
        if (!exists) {
          dispatch(createAccount(account));
        }
      });
    };

    fetchAccounts();
  }, [dispatch, accounts]);

  const getAccountName = (id: number): string => {
    const account = accounts.find((acc: Account) => acc.id === id);
    return account ? account.name : "Desconhecido";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-2xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Movimentações
        </h2>
        <ul className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction: Transaction, index: number) => (
              <li
                key={index}
                className="border border-gray-600 p-4 rounded bg-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                {getAccountName(transaction.senderId)} enviou
                <span className="font-semibold text-blue-400">
                  {" "}
                  {transaction.amount}{" "}
                </span>
                para {getAccountName(transaction.receiverId)}
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center">
              Nenhuma movimentação encontrada.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
