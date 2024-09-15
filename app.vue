
<script>
 //indexedDB.deleteDatabase("PostsDB");
 export default {
  data: () => ({
    links: [
      {
        title: "今日靠北",
        link: "/",
      },
      {
        title: "搜尋",
        link: "/search",
      },
      {
        title: "設定",
        link: "/settings",
      },
      {
        title: "檢舉",
        link: "/report",
      },
    ],
    currentTab: "/",
  }),
};
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar class="px-3" density="compact" color="green" flat>
        <v-avatar
          class="hidden-md-and-up"
          color="grey-darken-1"
          size="32"
        ></v-avatar>

        <v-spacer></v-spacer>

        <v-tabs centered>
          <v-tab
            v-for="link in links"
            :key="link"
            :text="link.title"
            :to="link.link"
            :value="link.link"
            v-model="currentTab"
          ></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>

        <v-avatar
          class="hidden-sm-and-down"
          color="grey-darken-1"
          size="32"
        ></v-avatar>
      </v-app-bar>
      <NuxtPage :key="currentTab" />
 
      <v-footer >
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            class="mx-2"
            color="white"
            rounded="xl"
            variant="text"
          >
            {{ link }}
          </v-btn>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} 0944-tw —
            <span class="font-weight-light"
              >我們非麥塊匿名發文平台官方網站。與麥塊匿名發文平台沒有關聯。
            </span>
            <p>
              <small class="text-grey"
                >資料來源: 麥塊匿名發文平台 | 點我支持靠北資料庫</small
              >
            </p>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
