export interface IToast {
    severity : 'success' | 'info' | 'warning' | 'error' | undefined;
    summary : string;
    detail : string;
    life : number; 
}
