<template>
    <ClientOnly>
        <Disclosure as="nav" class="" v-slot="{ open }">
            <div class="mx-auto ">

                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center font-bold text-xl">
                        <img src="/images/logo.png" alt="" class="w-16">
                        <p>Cuisto<span class="text-brown_color">Recettes</span></p>
                    </div>

                    <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="hidden sm:ml-6 lg:block">
                            <div class="flex space-x-4 font-semibold">
                                <a v-for="item in navigation" :key="item.name" href="">
                                    {{ item.name }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="hidden lg:block">
                        <NuxtLink to="/login"><Button :button="button" style="background-color: white;" /></NuxtLink>
                        <NuxtLink to="/signup"><Button :button="button1" style="color: white;" /></NuxtLink>
                    </div>


                    <div class="absolute inset-y-0 right-0 flex items-center lg:hidden">
                        <!-- Mobile menu button-->
                        <DisclosureButton>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>

                </div>
            </div>

            <DisclosurePanel class="lg:hidden ">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium']"
                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                    </DisclosureButton>
                </div>
                <div>
                    <NuxtLink to="/login"><Button :button="button" style="background-color: white;" /></NuxtLink>
                    <NuxtLink to="/signup"><Button :button="button1" style="color: white;" /></NuxtLink>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </ClientOnly>

</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
    { name: 'Accueil', href: '#', current: true },
    { name: 'Recettes', href: '#', current: false },
    { name: 'Ajouter une recette', href: '#', current: false },
    { name: 'Blog', href: '#', current: false },
    { name: 'À Propos', href: '#', current: false },
];
const button = 'Connexion';
const button1 = 'Inscription'
</script>