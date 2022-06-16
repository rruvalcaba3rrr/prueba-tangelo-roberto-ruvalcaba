export interface Loan {
  clientUid: string;
  clientEmail: string;
  clientName: string;
  amount: number;
  status: number;
  paymentDate: Date | null;
}
