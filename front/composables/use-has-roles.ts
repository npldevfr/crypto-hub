import type {Role} from "~/composables/use-auth";

export function useHasRoles() {
    const { user } = useAuth();

    const hasRoles = (roleKeys: (Pick<Role, 'key'> | string)[]): boolean => {
        if (user.value) {
            return roleKeys
                .map((role: string | Pick<Role, 'key'>): string => typeof role === 'string' ? role : role.key)
                .some((roleKey: string) => user.value?.roles
                    .some((role: Role): boolean => role.key === roleKey));
        }
        return false;
    };

    return { hasRoles };
}
