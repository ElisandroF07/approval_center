<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Request } from '~/types/request'
import { useRequestsStore } from '~/stores/requestsStore'

const useRequests = useRequestsStore()

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')
const UPagination = resolveComponent('UPagination')

const page = ref(1)

function approveRequest(id: string) {
    let requests = JSON.parse(localStorage.getItem('requests')!) as Request[]
    const index = requests.findIndex(request => request.id === id)
    if (index !== -1) {
        (requests[index] as Request).status = 'APPROVED'
        localStorage.setItem('requests', JSON.stringify(requests))
        useRequests.setRequests(requests)
        alert('Requisição aprovada com sucesso!')
    }
}

const columns: TableColumn<Request>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(UCheckbox, {
                modelValue: table.getIsSomePageRowsSelected()
                    ? 'indeterminate'
                    : table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                    table.toggleAllPageRowsSelected(!!value),
                'aria-label': 'Selecionar todos'
            }),
        cell: ({ row }) =>
            h(UCheckbox, {
                modelValue: row.getIsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
                'aria-label': 'Select row'
            })
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
        accessorKey: 'name',
        header: 'Nome',
        cell: ({ row }) => {
            return h('div', { class: 'font-medium' }, row.getValue('name'))
        }
    },
    {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row }) => {
            return h('div', { class: 'font-medium capitalize' }, row.getValue('type'))
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return h(UBadge, {
                class: 'capitalize',
                variant: 'subtle',
                style: {
                    backgroundColor: row.original.status === 'APPROVED' ? '#00BD89' : '#F9FAFB',
                    color: row.original.status === 'APPROVED' ? '#fff' : '#99A1AF',
                    borderColor: row.original.status === 'APPROVED' ? '#00DD83' : '#E4E4E7',
                }
            }, () => row.getValue('status'))
        }
    },
    {
        id: 'action',
        
        cell: ({ row }) => {
            return h('div', { class: 'flex justify-end' }, [
                h(UButton, {
                    label: 'Aprovar',
                    disabled: row.original.status === 'APPROVED',
                    class: 'text-white bg-[#0F8371] hover:bg-[#0c5e50] disabled:bg-zinc-100 disabled:text-gray-400 transition-colors duration-300 h-[35px] px-3 rounded-[12px]',
                    onClick: () => approveRequest(row.original.id)
                })
            ])
        }
    }
]
</script>

<template>

    <UTable :data="useRequests.getRequests" :columns="columns"
        class="flex-1 border-separate rounded-[12px] border border-gray-200 border-spacing-0"
        :ui="{
            th: 'text-xs font-bold uppercase text-gray-900 tracking-wide bg-gray-50',
             td: 'text-xs font-regular uppercase text-gray-600 tracking-wide bg-white',
             separator: 'bg-gray-200',
             tbody: 'divide-y divide-gray-200 divide-dashed',
             thead: ' divide-gray-400'
        }" />
    <div class="px-4 py-3.5 text-sm text-muted flex items-center justify-between">
        <div>
            {{ useRequests.getRequests.length }} linhas.
        </div>
        <UPagination v-model:page="page" active-color="primary" active-variant="subtle" :total="useRequests.getRequests.length" :page-size="10"
            :ui="{
                item: 'rounded-[10px] bg-zinc-50 border border-gray-200 text-gray-500',
                active: 'bg-[#3c4f62] text-white border border-gray-200',
                disabled: 'bg-zinc-100 text-gray-400 border border-gray-200 cursor-not-allowed',
                ellipsis: 'bg-zinc-100 text-gray-400 border border-gray-200 cursor-not-allowed',
                next: 'rounded-[10px] bg-zinc-50 border border-gray-200 text-gray-500',
                prev: 'rounded-[10px] bg-zinc-50 border border-gray-200 text-gray-500',
                fist: 'rounded-[10px] bg-zinc-50 border border-gray-200 text-gray-500',
                last: 'rounded-[10px] bg-zinc-50 border border-gray-200 text-gray-500'
            }"
        />
    </div>
</template>
