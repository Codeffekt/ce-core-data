import { CoreIndexElt, IndexType } from "../core/core.model";

export const ACCOUNT_SUPERADMIN = "admin";

export const ROLE_VIEW = "view";
export const ROLE_CREATE = "create";
export const ROLE_ADMIN = "admin";

export type AccountSettingsRoles = "view" | "create" | "admin" | "bot" | "receptionist";
export type AccountAppActions = 'none' | 'read' | 'write' | 'all';
export interface AccountAuthZ {
    actions: string[];
}
export interface AccountResourceAuthZ {
    [resource: string]: AccountAuthZ;
}

export interface AccountSettings extends CoreIndexElt {
    key?: string;
    account: string;
    login: string;
    passwd?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    lang?: string;
    role?: AccountSettingsRoles;
    authz?: AccountResourceAuthZ;
    projects?: IndexType[];
    rooms?: IndexType[];
    avatar?: string;
    isDisabled?: boolean;
    exp?: number; // expiration time optional
}

export const ACCOUNT_SETTINGS_EMPTY: AccountSettings = {
    key: "",
    account: "",
    login: "",
    passwd: "",
    firstName: "",
    lastName: "",
    email: "",
    lang: "",
    role: ROLE_VIEW,
    id: undefined,
    ctime: undefined,
    projects: [],
    rooms: []
};
