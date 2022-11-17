<template>
    <div class="container mx-auto px-2 md:px-4 lg:px-4 xl:px-2">
        <div class="mt-16 mb-8">
            <h2>لیست علاقه مندی ها:</h2>
            <div v-for="movie in getFavoriteMovies" :key="movie.id"
                class="bg-indigo-100 rounded flex justify-between py-4 px-2 my-2 border-l-4 border-l-pink-700 mx-auto max-w-2xl card">
                <p>{{ movie.name }}</p>
                <font-awesome-icon class="text-pink-700 text-2xl cursor-pointer hidden card-btn"
                    icon="fa-regular fa-circle-xmark" @click="onDelete(movie)" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            favoriteMovies: [],
        }
    },
    methods: {
        ...mapActions([
            'doGetFavoriteMovies',
            'doRemoveFromFavorites'
        ]),

        onDelete(movie) {
            this.getFavoriteMovies = this.getFavoriteMovies.filter(m => m.id != movie.id);
            this.doRemoveFromFavorites(movie)
        }
    },
    computed: {
        ...mapGetters([
            'getFavoriteMovies'
        ]),
    },
    created() {
        this.doGetFavoriteMovies();
    }
}
</script>

<style scoped>
.card {
    direction: ltr;
}

.card:hover .card-btn {
    display: inline;
}
</style>