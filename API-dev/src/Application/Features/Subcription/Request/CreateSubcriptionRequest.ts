export class CreateSubscriptionRequest {
    name: string;
    price: number;
    description: string;
    isDefault: boolean;
    imagePath?: string;
    isMonthly: boolean;
    unit: number;
}