<script setup>
const route = useRoute();

var content = useState("content", () => "");
var date = useState("date", () => "");
var type = useState("type", () => "");

const { data } = await useFetch('/api/fetchPostContent?id=' + route.params.id);

const post = data.value.post
date.value = post.approve.time;
content.value = post.content;
type.value = post.type;
useServerSeoMeta({
  title: () => "靠北DC - " + content.value.split("，")[0].slice(0, 25),
  description: () => content.value.slice(0, 100),
  ogImage: `https://cbmc.club/open_graph/open_graph_${route.params.id}.png`,
  ogTitle: () => "靠北DC - " + content.value.split("，")[0].slice(0, 25),
  ogDescription: () => content.value.slice(0, 100),
  twitterCard: "summary_large_image",

});

const share = () => {
  navigator.share({
    url: window.location.href,
    title: "靠北麥塊 - " + content.value.split("，")[0].slice(0, 25),
    text: content.value.slice(0, 100),
  });
};
</script>
<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="2"></v-col>
        <v-col md="7">
          <v-sheet min-height="70vh" rounded="lg">
            <div v-if="!content">
              <v-skeleton-loader
                type="heading"
                max-width="300px"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="text"
                max-width="100%"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="text"
                max-width="75%"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="text"
                max-width="50%"
              ></v-skeleton-loader>
            </div>

            <v-container style="padding: 25px">
              <h1 class="text-h4 font-weight-bold">
                {{ content.split("，")[0].slice(0, 25) }}
              </h1>
              <!-- Date -->
              <p class="text-subtitle-2">🖊️ {{ type }} • 📅 {{date}}</p>

              <p class="text-body-1">{{ content }}</p>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="2"></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
