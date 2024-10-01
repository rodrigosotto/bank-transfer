export interface Account {
  id: number;
  name: string;
  balance: number | string;
}

export interface Transaction {
  id?: number;
  senderId: number;
  receiverId: number;
  amount: number;
}