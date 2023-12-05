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
    props: true,
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
    props: true,
  },
  {
    path: "/quotes",
    name: "QuoteList",
    component: QuoteList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
