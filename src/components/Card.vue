<template>
     <RouterLink :to="{name:'notes.show',params:{_id:1}}" class="card bg-red-100 hover:shadow-xl rounded-xl hover:bg-red-200 text-gray-800 px-5 mx-[1vw] my-3 w-[90vw] sm:w-[45vw] lg:w-[31vw] h-[24vh] transition duration-300 cursor-pointer">
                <div class="flex justify-between rounded-md pt-5">
                    <h3 class="text-4xl font-bold">Title</h3>
                    <RouterLink :to="{name:'notes.update',params:{_id:1}}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8 p-2 rounded-3xl text-gray-800 bg-white transition duration-200 hover:shadow-md hover:scale-105">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    </RouterLink>
                </div>
                <p>Content</p>
     </RouterLink>
</template>