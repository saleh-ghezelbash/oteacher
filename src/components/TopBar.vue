<template>
    <div class="nav">
        <div class="container mx-auto">
            <nav class="
            rounded-b-3xl
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-indigo-100
        ">
                <div>
                    <RouterLink to="/" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                        <img class=" w-20 ml-2 text-blue-400" src="/src/assets/oteacher-logo.png" />
                        <span class="text-dark hover:text-pink-700 font-bold text-2xl">خانه</span>
                    </RouterLink>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer md:hidden block" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" @click="hidden = !hidden">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <div class="w-full md:flex md:items-center md:w-auto" :class="{hidden}">
                    <ul class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0">
                        <li v-if="getAccessToken">
                            <RouterLink to="/favorites" class="md:p-4 py-2 block hover:text-pink-700 text-dark font-bold">
                                علاقه مندی ها</RouterLink>
                        </li>
                        <li v-if="getAccessToken">
                            <RouterLink to="/items" class="md:p-4 py-2 block hover:text-pink-700 text-dark font-bold">
                                فیلم ها</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/about" class="md:p-4 py-2 block hover:text-pink-700 text-dark font-bold">
                                درباره ما</RouterLink>
                        </li>
                        <li v-if="!getAccessToken">
                            <RouterLink to="/login" class="md:p-4 py-2 block hover:text-pink-700 text-dark font-bold">
                                ورود</RouterLink>
                        </li>
                        <li v-if="getAccessToken">
                            <button @click=logout
                                class="md:p-4 py-2 block hover:text-pink-700 text-dark font-bold">خروج</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            hidden: true
        }
    },
    computed: {

        ...mapGetters([
            'getAccessToken'
        ]),
    },
    methods: {
        ...mapActions([
            'logout'
        ])
    },
}
</script>

<style scoped>
nav a:hover,
nav a.router-link-active,
nav a.router-link-exact-active {
    color: rgb(190 24 93);
}
</style>