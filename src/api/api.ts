import axios from 'axios';
interface AccountData {
  name: string;
  balance: number;
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const createAccountApi = async (accountData: AccountData) => {
  const response = await fetch('http://localhost:3000/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar a conta');
  }

  return await response.json(); // Retorna a conta criada
};

export const listAccountsApi = async () => {
    const response = await api.get('/accounts');
    return response.data;
};

export const listTransactionsApi = async () => {
  const response = await fetch('http://localhost:3000/transactions');

  if (!response.ok) {
      throw new Error('Erro ao buscar transações');
  }

  return await response.json();
};


export const transferFundsApi = async ({ account_from, account_to, amount }: { account_from: number; account_to: number; amount: number; }) => {
  const response = await fetch('http://localhost:3000/transfer', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_from, account_to, amount }),
  });

  if (!response.ok) {
      throw new Error('Erro ao transferir fundos');
  }

  return await response.json();
};

