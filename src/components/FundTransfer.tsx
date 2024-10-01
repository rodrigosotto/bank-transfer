import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transferFundsApi } from '../api/api';
import { createTransaction, updateBalance } from '../store/accountSlice';
import { RootState } from '../store';
import { Account } from './../types/types';

const TransferForm = () => {
    const [accountFrom, setAccountFrom] = useState<number | null>(null);
    const [accountTo, setAccountTo] = useState<number | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts.accounts);
    const [localAccounts, setLocalAccounts] = useState(accounts); // Estado local para os saldos


    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();

        if (accountFrom && accountTo && amount > 0) {
            try {
                const response = await transferFundsApi({ account_from: accountFrom, account_to: accountTo, amount });
                if (response.message) {
                    // Criar transação
                    dispatch(createTransaction({
                        senderId: accountFrom,
                        receiverId: accountTo,
                        amount,
                    }));

                                        // Atualizar saldo localmente
                                        setLocalAccounts((prevAccounts) =>
                                            prevAccounts.map(account => {
                                                if (account.id === accountFrom) {
                                                    return { ...account, balance: Number(account.balance) - amount };
                                                }
                                                if (account.id === accountTo) {
                                                    return { ...account, balance: Number(account.balance) + amount };
                                                }
                                                return account;
                                            })
                                        );

                    // Atualizar saldo da conta de origem
                    dispatch(updateBalance({
                        id: accountFrom,
                        newBalance: Number(accounts.find(a => a.id === accountFrom)?.balance) - amount,
                    }));

                    // Atualizar saldo da conta de destino
                    dispatch(updateBalance({
                        id: accountTo,
                        newBalance: Number(accounts.find(a => a.id === accountTo)?.balance) + amount,
                    }));

                    // Resetar campos
                    setAccountFrom(null);
                    setAccountTo(null);
                    setAmount(0);
                }
            } catch (error) {
                console.error("Erro na transferência:", error);
            }
        }
    };
        // useEffect para sincronizar localAccounts com o estado global accounts
        useEffect(() => {
            setLocalAccounts(accounts);
        }, [accounts]); // Atualiza localAccounts sempre que accounts muda

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleTransfer} className="bg-gray-800 shadow-lg rounded-lg px-8 py-6 max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Transferir Fundos</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">Conta de Origem</label>
                    <select
                        value={accountFrom ?? ''}
                        onChange={(e) => setAccountFrom(Number(e.target.value))}
                        className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Selecione a conta de origem</option>
                        {accounts.map((account: Account, index: number) => (
                            <option key={`${account.id}-${index}`} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">Conta de Destino</label>
                    <select
                        value={accountTo ?? ''}
                        onChange={(e) => setAccountTo(Number(e.target.value))}
                        className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Selecione a conta de destino</option>
                        {accounts.map((account: Account, index: number) => (
                            <option key={`${account.id}-${index}`} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2">Valor a Transferir</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Valor"
                        className="border border-gray-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200">
                    Transferir
                </button>
            </form>
        </div>
    );
};

export default TransferForm;
