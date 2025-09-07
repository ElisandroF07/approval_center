<template>
    <div class="bg-[#F3F6FD] min-h-screen min-w-screen flex gap-x-4 p-4 max-h-screen overflow-hidden">
        <Sidebar />
        <div class="flex-[1] min-h-full bg-white rounded-[16px] max-h-full overflow-y-auto">
            <slot/>
        </div>
    </div>
</template>