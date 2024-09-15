<script setup>
var Posts = ref({});
const fetchLatestPost = async () => {
  console.log("Fetching");
  const data = await fetch("https://api.cbdc.bio/v1/latest?limit=300");
  const json = await data.json();
  Posts.value = json.posts;
};
fetchLatestPost();
</script>

<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-card min-height="268" rounded="lg">
            <template v-slot:title>
              <span class="font-weight">熱榜 </span>
            </template>

            <v-card-text>
              <v-list lines="one">
                <v-list-item
                  v-for="n in 3"
                  :key="n"
                  :title="'Item ' + n"
                  subtitle="蔡徐坤++++!"
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-card min-height="70vh" rounded="lg">
            <v-card-text>
              <v-sheet min-height="250" class="fill-height" color="transparent">
                <div v-for="post in Posts">
                  <v-lazy>
                    <v-card
                      variant="tonal"
                      class="mx-auto"
                      :subtitle="post.post.type"
                      style="margin-bottom: 5px"
                      nuxt
                      :to="`view?id=${post.post.id.platform}`"
                    >
                      <template v-slot:title>
                        <span class="font-weight-black">{{
                          post.post.content.split("，")[0]
                        }}</span>
                      </template>

                      <v-card-text>
                        {{ post.post.content }}
                      </v-card-text>
                    </v-card>
                  </v-lazy>
                </div>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="2">
          <v-sheet min-height="268" rounded="lg">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
