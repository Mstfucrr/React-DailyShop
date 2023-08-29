import React from "react";

export interface IToast {
    severity : 'success' | 'info' | 'warning' | 'error' | undefined;
    summary : string;
    detail : React.ReactNode;
    life : number; 
}
