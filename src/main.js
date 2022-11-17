import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// Add FontAwsome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faHeart,faCircleXmark} from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartFilled,faArrowLeft,faSortDown ,faCaretDown,faCalendar,faChevronDown,faMagnifyingGlass,faStar,faVideo,faThumbsUp} from '@fortawesome/free-solid-svg-icons'
library.add(faCircleXmark,faHeart,faHeartFilled,faArrowLeft,faSortDown,faCaretDown,faCalendar,faChevronDown,faMagnifyingGlass,faStar,faVideo,faThumbsUp)

import './style.css'
import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
