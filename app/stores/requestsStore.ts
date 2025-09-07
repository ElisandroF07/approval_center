import { defineStore } from 'pinia'
import type { Request } from '~/types/request'

export const useRequestsStore = defineStore('requests', {
    state: () => ({
        requests: [] as Request[]
    }),
    actions: {
        setRequests(reqs: Request[]) {
            this.requests = reqs
        }  
    },
    getters: {
        getRequests: (state): Request[] => {
            return state.requests
        }
    }
})