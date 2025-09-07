import type { Request } from '~/types/request'

export default function approveRequest(id: string, setRequests: (reqs: Request[]) => void) {
    let requests = JSON.parse(localStorage.getItem('requests')!) as Request[]
    const index = requests.findIndex(request => request.id === id)
    if (index !== -1) {
        (requests[index] as Request).status = 'APPROVED'
        localStorage.setItem('requests', JSON.stringify(requests))
        setRequests(requests)
        alert('Requisição aprovada com sucesso!')
    }
}