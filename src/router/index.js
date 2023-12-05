import { createRouter, createWebHistory } from "vue-router";
import HouseList from "@/components/HouseList.vue";
import HouseDetail from "@/components/HouseDetail.vue";
import PersonList from "@/components/PersonList.vue";
import PersonDetail from "@/components/PersonDetail.vue";
import QuoteList from "@/components/QuoteList.vue";

const routes = [
  {
    path: "/",
    redirect: "/houses",
  },
  {
    path: "/houses",
    name: "HouseList",
    component: HouseList,
  },
  {
    path: "/house/:slug",
    name: "HouseDetail",
    component: HouseDetail,
    props: true, // This allows us to pass the slug as a prop to the component
  },
  {
    path: "/persons",
    name: "PersonList",
    component: PersonList,
  },
  {
    path: "/persons/:slug",
    name: "PersonDetail",
    component: PersonDetail,
    props: true, // This allows us to pass the slug as a prop to the component
  },
  {
    path: "/quotes",
    name: "QuoteList",
    component: QuoteList,
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(), // Use history mode for clean URLs
  routes,
});

export default router;
