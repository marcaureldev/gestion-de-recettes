<template>
  <div class="">
    <header class="font-medium p-4">
      <NavBar />
    </header>

    <section>
      <div class="mt-5 p-5 flex justify-between items-center">
        <div class="space-y-5">

          <h1 class="text-3xl sm:text-4xl font-bold leading-tight max-w-10 mx-auto md:mx-0"> Votre Plat Quotidien
            <span class="text-brown_color">
              Un Voyage Culinaire
            </span>
          </h1>

          <p class="text-gray_color text-center text-sm sm:text-[16px] md:text-start max-w-40">
            Explorez une galaxie de saveurs, partagez vos créations gourmandes et connectez-vous avec d'autres
            passionnés de cuisine. Inspirez-vous, échangez des recettes authentiques et embarquez pour une aventure
            culinaire inoubliable chaque jour.
          </p>

          <div class="space-y-2 text-center md:text-start">
            <div class="flex gap-5 justify-center md:justify-start items-center">
              <Button :button="connexion" style="color: black; padding: 2vh 5vh; background-color: #EBEBEB;"
                class="md:hidden block" />
              <Button :button="inscription" style="color: #fff; padding: 2vh 5vh;" />
            </div>
            <p class="text-sm text-gray_color">Do you have account? <a href="#" class="text-brown_color">Login</a> </p>
          </div>
        </div>

        <img src="../assets/images/about-img.png" alt="Image d'accueil sur la hero-section"
          class="w-24 hidden md:block">
      </div>
    </section>

    <section class="p-5 py-10">
      <div class="md:flex gap-8 items-center space-y-5">
        <img src="../assets/images/share.jpg" alt="Image de recettes" class="w-[18em] sm:w-[22em] md:w-[18em] mx-auto rounded-xl sm:rotate-90 md:rotate-0">

        <div class="text-center space-y-5">
          <h1 class="text-3xl font-bold">Partager Vos <span class="text-brown_color">Recettes</span></h1>
          <p class="text-gray_color text-sm sm:text-[16px]">
            Découvrez un monde de saveurs sur notre plateforme de partage de recettes ! Que vous soyez un chef amateur
            ou un passionné de cuisine, explorez, créez et partagez vos meilleures recettes avec une communauté de
            gourmets enthousiastes. Rejoignez-nous pour une expérience culinaire délicieusement inspirante.
          </p>
          <Button :button="new_recipes" style="color: #fff;"/>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

export default {
  data() {
    return {
      inscription: 'Inscription',
      connexion: 'Connexion',
      new_recipes: 'Créer une nouvelle recette',
    }
  }

}

</script>

<style></style>