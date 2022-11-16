<template>
    <div v-for="movie in favoriteMovies" :key="movie.id"
        class="bg-indigo-100 rounded flex justify-center align-center">
        <p>{{ movie.name }}</p>
        <button class="rounded bg-pink-700 text-white" @click="onDelete(movie.id)">X</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            favoriteMovies: [],
        }
    },
    methods: {
        getFavoriteMovies() {
            const favoritesString = localStorage.getItem('favorites');
            this.favoriteMovies = JSON.parse(favoritesString);
        },
        onDelete(id){
            const favoritesString = localStorage.getItem('favorites');
            const favorites = JSON.parse(favoritesString);
            this.favoriteMovies = favorites.filter(movie => movie.id != id);
            localStorage.setItem('favorites', JSON.stringify(this.favoriteMovies))
        }
    },
    created() {
        this.getFavoriteMovies();
    }
}
</script>

<style scoped>

</style>