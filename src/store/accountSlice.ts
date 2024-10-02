import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Account, Transaction } from "./../types/types";
import axios from "axios";

interface AccountState {
  accounts: Account[];
  transactions: Transaction[];
}

const initialState: AccountState = {
  accounts: [],
  transactions: [],
};

// Ação assíncrona para buscar contas
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await axios.get("/api/accounts");
    return response.data;
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    createAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateBalance: (
      state,
      action: PayloadAction<{ id: number; newBalance: number }>
    ) => {
      const account = state.accounts.find(
        (acc) => acc.id === action.payload.id
      );
      if (account) {
        account.balance = action.payload.newBalance;
      }
    },
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
  },
});

export const { createAccount, updateBalance, createTransaction } =
  accountSlice.actions;
export default accountSlice.reducer;
