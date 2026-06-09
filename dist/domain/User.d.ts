export interface UserProps {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class User {
    readonly id: string;
    name: string;
    email: string;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(props: UserProps);
    updateName(newName: string): void;
    updateEmail(newEmail: string): void;
}
//# sourceMappingURL=User.d.ts.map