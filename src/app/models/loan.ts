export interface Loan {
  id?: string;
  clientUid: string;
  clientEmail: string;
  clientName: string;
  amount: number;
  status: number;
  paymentDate: Date | null;
}
