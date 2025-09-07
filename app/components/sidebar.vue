<script setup lang="ts">
const route = useRoute()

const HomeIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
`

const InfoIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 16h.009" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
`

const navItems = [
  { label: "Início", to: "/", icon: HomeIcon },
  { label: "Sobre", to: "/sobre", icon: InfoIcon }
]

const linkClass = (to: string) => {
  return route.path === to
    ? "bg-[#3C4F62] text-white"
    : "text-gray-500"
}
</script>

<template>
  <nav class="w-60 min-h-full">
    <div>
      <img src="/logo.png" alt="Logo" class="w-40" />
    </div>

    <ul class="mt-14 flex flex-col gap-2">
      <li v-for="item in navItems" :key="item.to">
        <ULink :to="item.to" :class="linkClass(item.to) + 'transition-colors rounded-[12px] w-full duration-300 font-medium p-4 flex items-center justify-start gap-x-2'" >
          <span :class="linkClass(item.to)" v-html="item.icon"></span>
          <span :class="linkClass(item.to)">{{ item.label }}</span>
        </ULink>
      </li>
    </ul>
  </nav>
</template>
