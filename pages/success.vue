<template>
    <div class="">

        <!-- =============================== HEADER SECTION ========================================= -->
        <header class="font-medium p-4 max-w-70 mx-auto">
            <NavSuccess />
        </header>

        <!-- =============================== HERO SECTION ========================================= -->
        <section class="max-w-70 mx-auto">
            <div class="mt-5 p-5 flex justify-between items-center">
                <div class="space-y-5">
                    <h1 class="text-3xl sm:text-4xl text-center md:text-start font-bold leading-tight max-w-[15em] mx-auto md:mx-0" v-if="user">
                        Bienvenue
                        <span class="text-brown_color">
                            {{ user.nom }} {{ user.prenom }}
                        </span>
                    </h1>
                    <p class="text-gray_color text-center md:text-start max-w-40 mx-auto">
                        Explorez une galaxie de saveurs, partagez vos créations gourmandes et connectez-vous avec
                        d'autres
                        passionnés de cuisine. Inspirez-vous, échangez des recettes authentiques et embarquez pour une
                        aventure
                        culinaire inoubliable chaque jour.
                    </p>

                    <div class="space-y-2 text-center md:text-start">
                        <NuxtLink to="">
                            <Button :button="explorer" style="color: #fff; padding: 2vh 5vh;" />
                        </NuxtLink>
                    </div>
                </div>

                <img src="/images/about-img.png" alt="Image d'accueil sur la hero-section" class="w-24 hidden md:block">
            </div>
        </section>

        <!-- =============================== SECTION PARTAGEZ VOS RECETTES ========================================= -->

        <section class="p-5 py-10 max-w-70 mx-auto">
            <div class="md:flex gap-8 items-center space-y-5">
                <img src="/images/share.jpg" alt="Image de recettes"
                    class="w-[18em] sm:w-[22em] md:w-[18em] mx-auto rounded-xl sm:rotate-90 md:rotate-0">

                <div class="text-center space-y-5">
                    <h1 class="text-3xl font-bold">Partager Vos <span class="text-brown_color">Recettes</span></h1>
                    <p class="text-gray_color text-sm sm:text-[16px]">
                        Découvrez un monde de saveurs sur notre plateforme de partage de recettes ! Que vous soyez un
                        chef amateur
                        ou un passionné de cuisine, explorez, créez et partagez vos meilleures recettes avec une
                        communauté de
                        gourmets enthousiastes. Rejoignez-nous pour une expérience culinaire délicieusement inspirante.
                    </p>
                    <Button :button="new_recipes" style="color: #fff;" />
                </div>
            </div>
        </section>

        <!-- =============================== SECTION À LA UNE ========================================= -->

        <section class="p-8 max-w-70 mx-auto">
            <div class="p-5">
                <h1 class="text-3xl font-bold">À la une</h1>
                <p class="text-end text-brown_color text-lg font-bold">Voir plus</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                <TrendingCard v-for="(recipe, i) in trendindRecipes" :key="i" :trending="recipe"
                    class=" hover:scale-90 duration-700 ease-in-out" />
            </div>
        </section>

        <!-- =============================== SECTION BLOG ========================================= -->

        <section class="p-8 max-w-70 mx-auto">
            <div class="p-3">
                <h1 class="text-3xl font-bold">Blog</h1>
                <p class="text-end text-brown_color text-lg font-bold">Voir plus</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center ">
                <BlogCard v-for="(element, index) in blogData" :key="index" :blog="element"
                    class=" hover:scale-110 duration-700 ease-in-out" />
            </div>
        </section>

        <!-- =============================== SECTION EXPLORER LES RECETTES ========================================= -->

        <section class="p-8 max-w-70 mx-auto">
            <div class="p-5">
                <h1 class="text-3xl font-bold">Explorez les Recettes</h1>
                <p class="text-end text-brown_color text-lg font-bold">Voir plus</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                <TrendingCard v-for="(recipe, i) in exploreRecipes" :key="i" :trending="recipe"
                    class=" hover:scale-90 duration-700 ease-in-out" />
            </div>
        </section>

        <!-- =============================== SECTION RECETTES POPULAIRES ========================================= -->

        <section class="p-8 max-w-70 mx-auto">
            <div class="p-5">
                <h1 class="text-3xl font-bold">Recettes Populaires</h1>
                <p class="text-end text-brown_color text-lg font-bold">Voir plus</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 p-5 lg:grid-cols-4 gap-5 place-items-center resp">
                <PopularCard v-for="(recipe, i) in popularRecipes" :key="i" :popular="recipe" />
            </div>
        </section>

        <!-- =============================== FOOTER SECTION ========================================= -->

        <section class="p-8 bg-gray">
            <Footer />
        </section>

    </div>
</template>

<script>
export default {
    middleware : 'auth',
    data() {
        return {
            explorer: 'Explorer',
            connexion: 'Connexion',
            new_recipes: 'Créer une nouvelle recette',
            abonnement: 'S\'abonner',
            userData: null,

            trendindRecipes: [
                {
                    imageName: '/images/food_1.jpg',
                    name: 'Onions Rings',
                    avatar: '/images/avatar.jpg',
                    calories: '322',
                    count: '4.0'
                },

                {
                    imageName: '/images/food_3.jpg',
                    name: 'Spaghetti',
                    avatar: '/images/avatar.jpg',
                    calories: '244',
                    count: '4.5'
                },

                {
                    imageName: '/images/food_5.jpg',
                    name: 'Voandzou',
                    avatar: '/images/avatar.jpg',
                    calories: '210',
                    count: '5'
                },

                {
                    imageName: '/images/food_28.jpg',
                    name: "Frites d'alloco au poisson",
                    avatar: '/images/avatar.jpg',
                    calories: '142',
                    count: '4.5'
                },

                {
                    imageName: '/images/food_9.jpg',
                    name: 'Vermicelles',
                    avatar: '/images/avatar.jpg',
                    calories: '152',
                    count: '3.5'
                },

                {
                    imageName: '/images/food_14.jpg',
                    name: 'Pâte Blanche',
                    avatar: '/images/avatar.jpg',
                    calories: '412',
                    count: '4.5'
                },
            ],

            blogData: [
                {
                    image: '/images/blog_2.avif',
                    title: "Les bienfaits d'une alimentation saine pour votre corps",
                    subtitle: "Nourrir votre santé physique à travers des choix alimentaires éclairés",
                    content: "Adopter une alimentation saine est essentiel pour maintenir un corps et un esprit en bonne santé. Les aliments riches en nutriments, tels que les fruits, les légumes, les grains entiers et les protéines maigres, fournissent l'énergie nécessaire pour soutenir les fonctions corporelles et prévenir les maladies. Une alimentation équilibrée aide à maintenir un poids optimal, améliore la digestion et renforce le système immunitaire."
                },
                {
                    image: '/images/blog_1.png',
                    title: 'Les fruits : des antioxydants pour une peau radieuse',
                    subtitle: "Comment les antioxydants des fruits améliorent la santé de la peau.",
                    content: "Les fruits comme les oranges, les fraises et les kiwis sont riches en antioxydants, qui aident à neutraliser les radicaux libres responsables du vieillissement prématuré de la peau. Ces nutriments favorisent une peau plus ferme, éclatante et hydratée, tout en réduisant l'apparence des rides et des imperfections. Intégrez ces fruits colorés à votre régime alimentaire pour une peau saine et lumineuse de l'intérieur."
                },
            ],

            exploreRecipes: [
                {
                    imageName: '/images/food_1.jpg',
                    name: 'Onions Rings',
                    avatar: '/images/avatar.jpg',
                    calories: '322',
                    count: '4.0'
                },

                {
                    imageName: '/images/food_2.jpg',
                    name: 'Spaghetti',
                    avatar: '/images/avatar.jpg',
                    calories: '244',
                    count: '4.5'
                },

                {
                    imageName: '/images/food_3.jpg',
                    name: 'Voandzou',
                    avatar: '/images/avatar.jpg',
                    calories: '210',
                    count: '5'
                },

                {
                    imageName: '/images/food_4.jpg',
                    name: "Frites d'alloco au poisson",
                    avatar: '/images/avatar.jpg',
                    calories: '142',
                    count: '4.5'
                },

                {
                    imageName: '/images/food_5.jpg',
                    name: 'Vermicelles',
                    avatar: '/images/avatar.jpg',
                    calories: '152',
                    count: '3.5'
                },

                {
                    imageName: '/images/food_6.jpg',
                    name: 'Pâte Blanche',
                    avatar: '/images/avatar.jpg',
                    calories: '412',
                    count: '4.5'
                },
            ],

            popularRecipes: [
                {
                    backgroundImage: 'url(/images/food_17.jpg)',
                    name: 'Hamburger',
                },

                {
                    backgroundImage: 'url(/images/food_18.jpg)',
                    name: 'Sauce',
                },

                {
                    backgroundImage: 'url(/images/food_10.jpg)',
                    name: 'Akassa',
                },

                {
                    backgroundImage: 'url(/images/food_11.jpg)',
                    name: 'Riz + Brochettes',
                },

                {
                    backgroundImage: 'url(/images/food_12.jpg)',
                    name: 'Salade au Poisson',
                },

                {
                    backgroundImage: 'url(/images/food_13.jpg)',
                    name: 'Frites',
                },

                {
                    backgroundImage: 'url(/images/food_21.jpg)',
                    name: 'Riz au gras',
                },

                {
                    backgroundImage: 'url(/images/food_24.jpg)',
                    name: 'Onions Rings',
                },
            ],
        }
    },

    setup() {
        const user = useFirebaseUser();

        onMounted(async () => {
            await initUser();
        });

        return {
            user
        };
    }
}
</script>

<style>
.resp {
    @media (max-width: 430px) {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>