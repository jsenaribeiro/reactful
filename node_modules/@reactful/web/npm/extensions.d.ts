import React from "react";
export {};
declare global {
    interface Promise<T> {
        asLazyComponent(): React.FC<{
            route: string;
        }>;
        asLazyComponent(member: keyof T): React.FC<{
            route: string;
        }>;
    }
}
