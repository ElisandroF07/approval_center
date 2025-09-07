import { defineStore } from 'pinia'
import type { Request } from '~/types/request'

export const useRequestsStore = defineStore('requests', {
    state: () => ({
        requests: [] as Request[],
        requests_checked: [] as Request[]
    }),
    actions: {
        setRequests(reqs: Request[]) {
            this.requests = reqs
        },
        setRequestsChecked(reqs: Request[]) {
            this.requests_checked = reqs
        },
        appendRequest (req: Request) {
            this.requests_checked.push(req)
            console.log(this.requests_checked)
        },
        removeRequest (id: string) {
            this.requests_checked = this.requests_checked.filter(rid => rid.id !== id)
        },
        clearRequestsChecked() {
            this.requests_checked = []
        }
    },
    getters: {
        getRequests: (state): Request[] => {
            return state.requests
        },
        getRequestsChecked: (state): Request[] => {
            return state.requests_checked
        }
    }
})