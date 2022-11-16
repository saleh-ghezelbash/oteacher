<template>
    <div class="container mx-auto px-2 md:px-4 lg:px-4 xl:px-2">
        <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-4 mt-16 mb-8">
            <div class="col-span-4 order-2">

                <Search @search="searchFunc" />

                <p v-if="!isSearched && !loading" class="text-center m-44 font-bold text-2xl text-gray-400">
                    جستجو کنید
                </p>

                <Loading v-if="loading" class="text-center mt-64" />

                <template v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
                        <MovieCard v-for="movie in movieList" :key="movie.id" :genreList="genreList" :movie="movie" />
                    </div>

                    <hr class="mt-8 mb-4">

                    <Pagination :pagination="{
                        per_page: 20,
                        total: totalItems,
                        total_pages: totalPages
                    }" :current-page="currentPage" @pagechanged="onPageChange" />
                </template>
            </div>
            <div class="text-sm order-1">

                <Sort @sort="sort" />

                <Genre :dataList="genreList" @checkedValue="genreInput" />

                <ReleaseYear :dataList="years" @selectedYears="yearInput" />

                <Slider :minValue="1" :maxValue="7" :max="10" :min="0" :step="0.1" :ruler="false" :rangeMargin="0"
                    @input="updateSliderValues" />

                <NumberOfResult @per-page="perPage"/>

            </div>

        </div>
    </div>
</template>
  
<script>

import { ApiFactory } from '../api-factory.js';
import axios from 'axios';
import Sort from '../components/sort.vue';
import NumberOfResult from '../components/number-of-result.vue';
import Search from '../components/search.vue';
import Loading from '../components/loading.vue';
import MovieCard from '../components/movie-card.vue';
import Genre from '../components/genre.vue';
import ReleaseYear from '../components/release-year.vue';
import Pagination from '../components/pagination.vue';
import Slider from '../components/slider.vue';

export default {
    components: {
        Sort,
        NumberOfResult,
        Search,
        Loading,
        MovieCard,
        Genre,
        ReleaseYear,
        Slider,
        Pagination
    },
    data() {
        return {
            movieList: [],
            genreList: [],
            totalPages: 1,
            totalItems: 0,
            loading: false,
            isEmpty: true,
            searchValue: "",
            sortValue: "",
            perPageValue:"",
            genreValue: "",
            year: "",
            currentPage: 1,
            minValue: null,
            maxValue: null,
            isSearched: false,
            years: []
        }
    },
    methods: {
        getYears() {
            let years = [];
            for (let i = 1980; i < 2030; i++) {
                years.push(i);
            }
            this.years = years;
        },
        updateSliderValues(v) {
            this.minValue = v.minValue;
            this.maxValue = v.maxValue;
            this.getAllMovies();
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getAllMovies();
        },
        genreInput(val) {
            this.genreValue = val;
            this.getAllMovies();
        },
        yearInput(val) {
            this.year = val;
            this.getAllMovies();
        },
        sort(val) {
            this.sortValue = val;
            this.getAllMovies();
        },
        perPage(val) {
            this.perPageValue = val;
            this.getAllMovies();
        },
        searchFunc(val) {
            this.searchValue = val;
            this.getAllMovies();
        },
        // Get movie list from API
        getAllMovies() {
            this.loading = true;
            axios.get(ApiFactory.MovieList,
                {
                    params: {
                        api_key: ApiFactory.ApiKey,
                        page: this.currentPage,
                        searchValue:this.searchValue,
                        sort_by: this.sortValue,
                        with_genres: this.genreValue,
                        primary_release_year: this.year,
                        "vote_average.gte": this.minValue,
                        "vote_average.lte": this.maxValue,
                        "per-page": this.perPageValue
                    }
                })
                .then((response) => {
                    this.totalPages = response.data.total_pages;
                    this.totalItems = response.data.total_results;
                    this.movieList = response.data.results;
                    this.isEmpty = this.movieList.length < 1;

                    this.loading = false;
                    this.isSearched = true;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        },
        // Get Genre list from API
        getAllGenres() {
            axios.get(ApiFactory.Genres, {
                params: {
                    api_key: ApiFactory.ApiKey,
                }
            })
                .then((response) => {
                    this.genreList = response.data.genres;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        // Call Apis
        this.getYears();
        this.getAllGenres();
    }
}
</script>
  
<style scoped>

</style>
  