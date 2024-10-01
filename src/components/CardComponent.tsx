import React, { useState } from 'react';
import AccountForm from './AccountForm';
import FundTransfer from './FundTransfer';
import TransactionList from './TransactionList';
import ListAccounts from './ListAccounts'

const CardComponent: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(null);

    const handleCardClick = (component: JSX.Element) => {
        setSelectedComponent(component);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Navegue pelas Opções</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    className="bg-gray-800 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition"
                    onClick={() => handleCardClick(<AccountForm />)}
                >
                    <h2 className="text-xl font-semibold mb-2">Criar Conta</h2>
                    <p>Abra uma nova conta com facilidade e segurança.</p>
                </div>
                <div
                    className="bg-gray-800 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition"
                    onClick={() => handleCardClick(<FundTransfer />)}
                >
                    <h2 className="text-xl font-semibold mb-2">Realizar Transferência</h2>
                    <p>Envie dinheiro rapidamente para qualquer conta.</p>
                </div>
                <div
                    className="bg-gray-800 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition"
                    onClick={() => handleCardClick(<TransactionList />)}
                >
                    <h2 className="text-xl font-semibold mb-2">Listar Transações</h2>
                    <p>Visualize todas as suas transações em um só lugar.</p>
                </div>
                <div
                    className="bg-gray-800 text-white p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition"
                    onClick={() => handleCardClick(<ListAccounts />)}
                >
                    <h2 className="text-xl font-semibold mb-2">Listar Transações</h2>
                    <p>Veja a lista com valores atualizados das contas.</p>
                </div>
            </div>

            <div className="mt-6">
                {selectedComponent}
            </div>
        </div>
    );
};

export default CardComponent;
