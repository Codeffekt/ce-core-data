import { FormWrapper } from "../forms/FormWrapper";
import { FormBlockEntity, FormRootEntity } from "../forms/FormRoot";
import { AccountResourceAuthZ, AccountSettingsRoles } from "./account.model";
import { FormInstance } from "../public-api";

@FormRootEntity({ id: FormAccount.ROOT, title: "Form Account" })
export class FormAccount {

    static readonly ROOT = "forms-account";

    @FormBlockEntity({ type: "text" })
    account: string;

    @FormBlockEntity({ type: "text" })
    login: string;

    @FormBlockEntity({ type: "text" })
    firstName?: string;

    @FormBlockEntity({ type: "text" })
    lastName?: string;

    @FormBlockEntity({ type: "text" })
    email?: string;

    @FormBlockEntity({ type: "text" })
    lang?: string;

    @FormBlockEntity({ type: "object" })
    authz?: AccountResourceAuthZ;

    @FormBlockEntity({ type: "text" })
    role?: AccountSettingsRoles;

    @FormBlockEntity({ type: "text" })
    avatar?: string;
}

export class FormAccountWrapper extends FormWrapper<FormAccount> {

    constructor(form?: FormInstance) {
        if (form !== undefined) {
            super(FormWrapper.createProps(form), form);
        } else {
            super(new FormAccount());
        }
    }

}