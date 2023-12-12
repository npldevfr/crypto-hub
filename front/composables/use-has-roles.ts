import type {Role} from "~/composables/use-auth";

export function useHasRoles() {
    const { user } = useAuth();

    const hasRoles = (roleKeys: Pick<Role, 'key'>[]): boolean => {
        if (user.value) {
            return roleKeys
                .some((roleKey: Pick<Role, 'key'>) => user.value?.roles
                    .some((role: Role): boolean => role.key === roleKey.key));
        }
        return false;
    };

    return { hasRoles };
}
