import type { Request } from '~/types/request'

export default function filterRequests(searchQuery: Ref<string>, statusFilter: Ref<string>, setRequests: (reqs: Request[]) => void) {
    const allRequests = JSON.parse(localStorage.getItem('requests')!) as Request[]
    let filtered = allRequests.filter(value => {
        const matchesSearch = value.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        if (statusFilter.value === 'ALL') {
            return matchesSearch
        } else {
            const matchesStatus = value.status === statusFilter.value
            return matchesSearch && matchesStatus
        }
    })
    setRequests(filtered);
}