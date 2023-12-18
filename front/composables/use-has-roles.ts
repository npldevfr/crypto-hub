import type {Role, User} from "~/composables/use-auth";

export function useHasRoles() {
    const { user } = useAuth();

    const hasRoles = (roleKeys: (Pick<Role, 'key'> | string)[], customUser?: User): boolean => {

        if(!customUser && user.value) {
            customUser = user.value;
        } else if(!customUser) {
            return false;
        }

        if (customUser) {
            return roleKeys
                .map((role: string | Pick<Role, 'key'>): string => typeof role === 'string' ? role : role.key)
                .some((roleKey: string) => customUser?.roles
                    .some((role: Role): boolean => role.key === roleKey));
        }
        return false;
    };

    return { hasRoles };
}
