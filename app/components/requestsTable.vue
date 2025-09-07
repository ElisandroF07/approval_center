<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Request } from '~/types/request'
import { useRequestsStore } from '~/stores/requestsStore'
import approveRequest from '~/helpers/approveRequest'

const useRequests = useRequestsStore()

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')
const UPagination = resolveComponent('UPagination')

const page = ref(1)

const columns: TableColumn<Request>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(UCheckbox, {
                modelValue: table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value: boolean) => {
                    table.toggleAllPageRowsSelected(!!value)
                    if (!!value) {
                        useRequests.setRequestsChecked([...useRequests.getRequests.filter((request: Request) => request.status !== 'APPROVED')])
                    } else {
                        useRequests.clearRequestsChecked()
                    }

                }

            }),
        cell: ({ row }) =>
            h(UCheckbox, {
                modelValue: row.getIsSelected(),
                disabled: row.original.status === 'APPROVED',
                'onUpdate:modelValue': (value: boolean) => {
                    row.toggleSelected(!!value)
                    if (!!value) {
                        useRequests.appendRequest(row.original)
                    } else {
                        useRequests.removeRequest(row.original.id)
                    }
                }
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
            }, () => row.getValue('status') === "APPROVED" ? 'Aprovado' : 'Pendente')
        }
    },
    {
        id: 'action',

        cell: ({ row }) => {
            return h('div', { class: 'flex justify-end' }, [
                h(UButton, {
                    label: row.original.status === 'APPROVED' ? 'Aprovado' : 'Aprovar',
                    disabled: row.original.status === 'APPROVED',
                    class: 'text-white bg-[#0F8371] hover:bg-[#0c5e50] disabled:bg-zinc-100 disabled:text-gray-400 transition-colors duration-300 h-[35px] px-3 rounded-[12px]',
                    onClick: () => approveRequest(row.original.id, useRequests.setRequests.bind(useRequests))
                })
            ])
        }
    }
]
</script>

<template>
    <UTable :data="useRequests.getRequests.slice(page * 10 - 10, page * 10)" :items-per-page="10" defalt-page="1"
        :columns="columns" class="flex-1 border-separate rounded-[12px] border border-gray-200 border-spacing-0" :ui="{
            th: 'text-xs font-bold uppercase text-gray-900 tracking-wide bg-gray-50',
            td: 'text-xs font-regular uppercase text-gray-600 tracking-wide bg-white',
            separator: 'bg-gray-200',
            tbody: 'divide-y divide-gray-200 divide-dashed',
            thead: ' divide-gray-400'
        }" />
    <div class="px-4 py-3.5 text-sm text-muted flex items-center justify-between">
        <div>
            {{ useRequests.getRequestsChecked.length }} linhas.
        </div>
        <UPagination v-model:page="page" :total="useRequests.getRequests.length" color="neutral"
            activeColor="primary" />
    </div>
</template>
