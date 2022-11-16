<template>

    <div
        class="flex h-64 cursor-pointer overflow-hidden transform hover:translate-y-2 shadow-xl transition duration-300 rounded-lg bg-gray-100">
        <div class="flex-none w-1/2 relative overflow-hidden">
            <img :src="getMovieImage(movie.poster_path)" :alt="movie.title"
                class="rounded-r-lg w-full h-full aspect-3/4" loading="lazy" />
        </div>

        <div class="flex flex-col justify-between p-4">
            <div class="flex flex-wrap overflow-hidden text-ellipsis">
                <h2 class="flex-auto">
                    <font-awesome-icon icon="fa-solid fa-video" class="text-gray-500" />
                    <span class="text-gray-500 mx-1">نام فیلم:</span> {{ movie.title }}
                </h2>
            </div>
            <div>
                <div class="flex flex-wrap py-2 overflow-hidden text-ellipsis">
                    <h2 class="flex-auto text-xs">
                        <font-awesome-icon icon="fa-solid fa-calendar" class="text-gray-500" />
                        <span class="text-gray-500 mx-1">تاریخ انتشار:</span> {{ movie.release_date }}
                    </h2>
                </div>
                <div class="flex flex-wrap py-2 overflow-hidden text-ellipsis">
                    <h2 class="flex-auto text-xs">
                        <font-awesome-icon icon="fa-solid fa-thumbs-up" class="text-gray-500" />
                        <span class="text-gray-500 mx-1">تعداد رای:</span> {{ movie.vote_count }}
                    </h2>
                </div>
                <div class="flex flex-wrap py-2 overflow-hidden text-ellipsis">
                    <h2 class="flex-auto text-xs">
                        <font-awesome-icon icon="fa-solid fa-star" class="text-gray-500" />
                        <span class="text-gray-500 mx-1">امتیاز:</span> {{ movie.vote_average }}
                    </h2>
                </div>
                <font-awesome-icon v-if="isFavorite" @click="removeFromFavorites" icon="fa-solid fa-heart" />
                <font-awesome-icon v-else @click="addToFavorites" icon="fa-regular fa-heart" />
                <!-- <div>
                    <span>افزودن به علاقه مندی ها</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { ApiFactory } from '../api-factory.js';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    props: {
        movie: Object,
    },
    data() {
        return {
            isFavorite: false
        }
    },
    methods: {
        // ...mapActions([
        //     ''
        // ]),
        getMovieImage(poster_path) {
            return `${ApiFactory.ImageUrl}/${poster_path}`;
        },
        addToFavorites() {
            const favoritesString = localStorage.getItem('favorites');
            const favoritesArray = JSON.parse(favoritesString);
            favoritesArray.push({
                id: this.movie.id,
                name: this.movie.title
            })
            localStorage.setItem('favorites', JSON.stringify(favoritesArray))
            this.isFavorite = !this.isFavorite;
        },
        removeFromFavorites() {
            const favoritesString = localStorage.getItem('favorites');
            const favoritesArray = JSON.parse(favoritesString);
            const filteredFavoritesArray = favoritesArray.filter(movie => movie.id != this.movie.id);
            localStorage.setItem('favorites', JSON.stringify(filteredFavoritesArray))
            this.isFavorite = !this.isFavorite;
        },
        checkFavoriteMovies() {
            const favoritesString = localStorage.getItem('favorites');
            const favoritesArray = JSON.parse(favoritesString);
            const movieIndex = favoritesArray.findIndex(movie => movie.id == this.movie.id);
            if (movieIndex != -1) {
                this.isFavorite = true;
            }
        }
    },
    computed: {
        // ...mapGetters([
        //     ''
        // ]),
    },
    mounted() {
        this.checkFavoriteMovies();
    }
}
</script>