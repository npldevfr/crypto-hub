import { $fetch } from "~/composables/use-fetch";
import type {User} from "~/composables/use-auth";
import type {ComputedRef, Ref} from "vue";
import type {PaginatedData} from "~/types/pagination";

export function userService() {

    const getPaginatedUsers = () => {
        const page: Ref<number> = ref<number>(1)
        const sortable = ref({
            column: 'email',
            direction: 'asc'
        })
        const query: Ref<string> = ref<string>('')
        const computedPage: ComputedRef<string> = computed(() => `/users?page=${page.value}&perPage=10&sortBy=${sortable.value.column}&sortDirection=${sortable.value.direction}&query=${query.value}`)

        const { get, data } = $fetch(computedPage, {
            immediate: true,
            refetch: true
        }).json<PaginatedData<User>>()

        return {
            page,
            data,
            get,
            query,
            sortable
        }
    }

    return {
        getPaginatedUsers
    }

}
