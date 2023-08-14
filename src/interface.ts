export interface Invoice {
    paymentRequest: string;
    paymentHash: string;
    preimage: string | null;
    verify: string | null;
}