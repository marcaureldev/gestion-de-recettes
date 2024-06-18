<template>
    <div class="border-[1px] border-gray max-w-[20em] rounded-lg">
        <img :src="trending.imageName" alt="Les Recetes qui fond tendance" class="w-[20em] rounded-lg">
        <div class="flex justify-between items-center p-2">
            <div class="flex gap-1 items-center w-28">
                <IconStars v-for="stars in Math.floor(trending.count)" :key="stars" style="color: #B55D51;"
                    class="size-6" />
                <IStarHalfFull v-if="(trending.count % 1 !== 0)" style="color: #B55D51;" class="size-6" />
                <IStarsEmpty v-for="stars in ((5 - Math.floor(trending.count)) - (trending.count % 1 !== 0))" :key="stars" style="color: #B55D51;"
                    class="size-6" />
            </div>
            <p> {{ trending.count }}</p>
        </div>
        <p class="p-2">{{ trending.name }}</p>

        <div class="flex justify-between items-center p-2">

            <div class="flex gap-3 items-center">
                <img :src="trending.avatar" alt="Avatar" class="w-12 h-12 rounded-[24px]">
                <p>Alex Martin</p>
            </div>
            <div class="flex justify-between items-center">
                <FireIcon style="color: #B55D51;" />
                <p>{{ trending.calories }} cals</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        trending: Object,
    }

}


</script>

<style></style>
