import { mockData } from "~/data/mockData"
import type { Request } from '~/types/request'

export default function refreshRequests(filteredRequests: Ref<Request[]>, setRequests: (reqs: Request[]) => void, getRequests: () => Request[]) {
    const stored = localStorage.getItem('requests')
    if (stored) {
        setRequests(JSON.parse(stored) as Request[])
    } else {
        localStorage.setItem('requests', JSON.stringify(mockData))
        setRequests(mockData)
    }
    filteredRequests.value = getRequests()
}