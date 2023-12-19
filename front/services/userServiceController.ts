import { $fetch } from "~/composables/use-fetch";
import type {User} from "~/composables/use-auth";
import type {ComputedRef, Ref} from "vue";
import type {PaginatedData} from "~/types/pagination";
import type {AfterFetchContext} from "@vueuse/core";

export function userServiceController() {

    const index = () => {
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

        // If the page is greater than the last page, we set the page to the last page
        watch(data, (newData) => {
            if (newData) {
                if (page.value > newData.meta.last_page) {
                    page.value = newData.meta.last_page
                }
            }
        })

        return {
            page,
            data,
            get,
            query,
            sortable
        }
    }

    const show = (user_id: Pick<User, 'id'>['id']) => {
        return $fetch(`/users/${user_id}`).json<User>()
    }

    const updateOrDelete = (user_id: Pick<User, 'id'>['id']) => {
        return $fetch(`/users/${user_id}`, {
            immediate: false
        }).json<User>()
    }

    const toggleBlock = (user_id: Pick<User, 'id'>['id']) => {
        return $fetch(`/users/${user_id}/toggle-block`, {
            immediate: false
        }).json<User>()
    }

    const loginAs = (user_id: Pick<User, 'id'>['id']) => {

        const { setUser } = useAuth()

        return $fetch(`/users/${user_id}/login-as`, {
            immediate: false,
            async afterFetch({ data }: AfterFetchContext<{ token: string }>): Promise<any> {
                if (data?.token)
                    await setUser(data?.token)

            },
        }).json<User>()
    }

    return {
        index,
        show,
        updateOrDelete,
        toggleBlock,
        loginAs
    }

}
