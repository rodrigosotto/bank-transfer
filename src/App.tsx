import './index.css'
import AccountForm from './components/AccountForm';
import FundTransfer from './components/FundTransfer';
import TransactionList from './components/TransactionList';
import ListAccounts from './components/ListAccounts';

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administração de Contas Bancárias</h1>
      
      {/* Formulário para criar novas contas */}
      <AccountForm />
      
      {/* Componente para realizar transferências */}
      <FundTransfer />
      
      {/* Componente para listar transações */}
      <TransactionList />

      {/* Componente para listar contas e seus saldos */}
      <ListAccounts />
    </div>
  );
}

export default App;
