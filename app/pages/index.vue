<script setup lang="ts">
import { ref, onMounted } from 'vue';
import filterRequests from '~/helpers/filterRequests';
import refreshRequests from '~/helpers/refreshRequests';
import { type Request } from '~/types/request';
import { filter_status } from '~/constants/filter_status';
import { useRequestsStore } from '~/stores/requestsStore';

const searchQuery = ref('');
const statusFilter = ref('ALL')
const open = ref(false)
const filteredRequests = ref<Request[]>([])
const useRequests = useRequestsStore()
function getReq(): Request[] {
  return useRequests.getRequests
}
onMounted(() => refreshRequests(filteredRequests, useRequests.setRequests.bind(useRequests), getReq))
watch([searchQuery, statusFilter], () => filterRequests(searchQuery, statusFilter, useRequests.setRequests.bind(useRequests)))

function approveAll(): void {
  const checkedRequests = useRequests.getRequestsChecked;
  const updatedRequests = useRequests.getRequests.map((request: Request) => {
    if (checkedRequests.some((checked: Request) => checked.id === request.id)) {
      return { ...request, status: 'APPROVED' };
    }
    return request;
  });
  useRequests.setRequests(updatedRequests as Request[]);
  localStorage.setItem('requests', JSON.stringify(updatedRequests));
  alert("Todos os pedidos foram aprovados com sucesso!");
  useRequests.clearRequestsChecked();
  open.value = false;
}

function openModal() {
  open.value = true;
}

</script>

<template>
  <div class="h-full">
    <UContainer class="flex justify-between items-center py-8 max-w-[1440px]">
      <div>
        <h1 class="font-bold text-3xl text-[#3C4F62]">Central de aprovações</h1>
        <p class="text-lg text-gray-500">Bem vindo à central de aprovações</p>
      </div>
      <div>
        <UAvatar src="https://avatars.githubusercontent.com/u/100567537?v=4" size="3xl" />
      </div>
    </UContainer>
    <UContainer class="h-[160px] flex-[1] grid grid-cols-4 max-w-[1440px] gap-x-4">
      <Ucard variant="subtle" class="flex-[1] bg-blue-100 rounded-[16px]" v-for="i in 4" :key="i">

      </Ucard>
    </UContainer>
    <UContainer class="max-w-[1440px] pt-8 pb-5 flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <div
          class="flex items-center gap-x-4 bg-zinc-50 w-[300px] h-[50px] px-4 rounded-[12px] text-gray-500 border border-zinc-200">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>
          <input v-model="searchQuery" id="search-input" type="text" placeholder="Buscar aprovações..."
            class="w-full h-full outline-none bg-transparent placeholder:text-gray-400">
        </div>
        <USelect v-model="statusFilter" :items="filter_status"
          class="w-[130px] h-[50px] rounded-[12px] bg-zinc-50 border border-gray-200" :ui="{
            base: 'text-gray-500 border border-gray-200 rounded-[12px] bg-zinc-50 focus:outline-none focus:ring-0 focus:border-gray-200',
            content: 'bg-zinc-50 border border-gray-200 rounded-[12px] p-1',
            item: 'text-gray-500 hover:bg-gray-[#3c4f62] hover:text-white cursor-pointer rounded-md px-2 py-1'
          }" />

      </div>
      <div>
        <UButton label="Aprovar todos" @click="openModal"
          class="text-white bg-[#0F8371] hover:bg-[#0c5e50] disabled:bg-zinc-100 disabled:text-gray-400 transition-colors duration-300 h-[50px] px-6 rounded-[12px]" />
      </div>
    </UContainer>
    <UContainer class="max-w-[1440px] pb-6">
      <div class="overflow-y-auto rounded-[12px]">
        <RequestsTable />
      </div>
    </UContainer>
    <ConfirmationModal :open="open" @close="open = false" @approve="approveAll" />
  </div>
</template>
