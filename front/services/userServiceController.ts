import { $fetch } from "~/composables/use-fetch";
import type {User} from "~/composables/use-auth";
import type {ComputedRef, Ref} from "vue";
import type {PaginatedData} from "~/types/pagination";

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

    const update = (user_id: Pick<User, 'id'>['id']) => {
        return $fetch(`/users/${user_id}`, {
            immediate: false
        }).json<User>()
    }

    const destroy = (user_id: Pick<User, 'id'>['id']) => {
        const { delete: destroy, data } = $fetch(`/users/${user_id}`, {
            immediate: false
        }).json<User>()

        return {
            data,
            destroy
        }
    }

    return {
        index,
        show,
        update,
        destroy
    }

}
