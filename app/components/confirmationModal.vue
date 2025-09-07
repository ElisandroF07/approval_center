<script setup lang="ts">
const UModal = resolveComponent('UModal')
const UButton = resolveComponent('UButton')

defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <UModal v-bind:open="open" v-on:close="$emit('close')" class="h-[400px] rounded-[12px] p-4">
    <UButton label="Open" color="neutral" variant="subtle" />
    <template #content class="p-6 mt-8">
        <h1 class="px-4 font-bold text-xl mt-5">Confirmação de Aprovação</h1>
        <p class="px-4 py-2 text-md ">Tem certeza que deseja aprovar todas as solicitações selecionadas?</p>
        <div class="mt-12 flex justify-end p-6 gap-x-4">
            <UButton label="Cancelar" v-on:click="$emit('close')" class="text-white bg-gray-400 hover:bg-gray-500 disabled:bg-zinc-100 disabled:text-gray-400 transition-colors duration-300 h-[50px] px-6 rounded-[12px]" />
            <UButton label="Aprovar todos" v-on:click="$emit('approve')" class="text-white bg-[#0F8371] hover:bg-[#0c5e50] disabled:bg-zinc-100 disabled:text-gray-400 transition-colors duration-300 h-[50px] px-6 rounded-[12px]" />
        </div>
    </template>
  </UModal>
</template>
