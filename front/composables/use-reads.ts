import { useStorage } from '@vueuse/core'
export function useReads() {

    /**
     * Read articles ids from storage
     */
    const readIds = useStorage<string[]>('articleReadIds', [])

    /**
     * Check if an article is read
     * @param id
     */
    const isRead = (id: string) => readIds.value.includes(id)

    /**
     * Mark an article as read
     * @param id
     */
    const markAsRead = (id: string): void => {
        if (!isRead(id)) {
            readIds.value.push(id)
        }
    }

    return {
        readIds,
        isRead,
        markAsRead
    }
}
