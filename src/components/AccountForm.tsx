import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../store/accountSlice';
import { createAccountApi } from '../api/api';
import { AppDispatch } from '../store';

const AccountForm = () => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && balance >= 0) {
            const newAccount = await createAccountApi({ name, balance });
            dispatch(createAccount(newAccount));
            setName('');
            setBalance(0);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Criar Conta</h2>

                <div className="flex flex-col">
                    <label htmlFor="accountName" className="text-gray-300 mb-1">Nome da Conta:</label>
                    <input
                        id="accountName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome da conta"
                        className="border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="accountBalance" className="text-gray-300 mb-1">Saldo Inicial:</label>
                    <input
                        id="accountBalance"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
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
            </form>
        </div>
    );
};

export default AccountForm;
