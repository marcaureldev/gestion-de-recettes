<template>
    <div class="border-[1px] border-gray max-w-[30em]  rounded-lg">
        <img :src="blog.image" alt="" class="rounded-lg">
        <div class="space-y-2 p-2">
            <h1 class="text-lg font-bold text-center">{{ blog.title }}</h1>
            <p class="text-gray_color text-sm text-center font-bold">
            {{ blog.subtitle }}
            </p>
            <p class="text-[13px] text-gray_color max-w-30 mx-auto text-center multitruncate">
               {{ blog.content }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        blog: Object,
    }

}
</script>

<style>
.multitruncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>