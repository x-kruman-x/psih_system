type modificationProps = {
    amount: number;
    modification: {
        size: string;
        article: (string | null);
        remaining: number;
        id: number;
        product_id: number;
    }
    id: number;
}

export function ProductsInOrderTable({products}: modificationProps) {
    
}