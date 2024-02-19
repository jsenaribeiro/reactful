import React from "react";
declare global {
    interface Promise<T> {
        asLazyComponent(): React.FC<{
            route: string;
        }>;
        asLazyComponent(name: keyof T): React.FC<{
            route: string;
        }>;
    }
}
