<template>
     <header class="flex h-[17vh] justify-between items-center bg-blue-100 px-10  z-50">
        <div>
            <RouterLink :to="{name:'notes'}" class="text-gray-900 font-bold text-3xl">🗒️ Mes Post-Its</RouterLink>
            <p class="opacity-60 text-gray-800">Organisez vos idées, simplement et efficacement</p>
        </div>
        <div>
            <RouterLink :to="{name:'local.notes'}" class="px-4 py-2 mx-4 bg-gray-800 text-white border hover:text-black hover:bg-white transition duration-300 cursor-pointer" >Test local</RouterLink>
            <RouterLink :to="{name:'notes'}" class="px-4 py-2 bg-gray-800 text-white border hover:text-black hover:bg-white transition duration-300 cursor-pointer">Test en ligne</RouterLink>
        </div>
    </header>
</template>
<script setup>

</script>