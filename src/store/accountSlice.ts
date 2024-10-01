import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, Transaction } from './../types/types';

interface AccountState {
  accounts: Account[];
  transactions: Transaction[];
}

const initialState: AccountState = {
  accounts: [],
  transactions: [],
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    createAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateBalance: (state, action: PayloadAction<{ id: number; newBalance: number }>) => {
      const account = state.accounts.find(acc => acc.id === action.payload.id);
      if (account) {
        account.balance = action.payload.newBalance;
      }
    },
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { createAccount, updateBalance, createTransaction } = accountSlice.actions;
export default accountSlice.reducer;
