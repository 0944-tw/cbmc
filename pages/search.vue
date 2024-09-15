<script setup>
var IDRange = ref();
var SearchArgs = ref("");
var SearchResult = ref([])
var SearchCount = ref(0)
var SearchPages = ref(0)
var CurrentPage = ref(0)
const { result, search } = useAlgoliaSearch('Posts');
const searchAsync = async (args,page = 1) => {
  console.log(`Searching for ${args} on page ${page}`)
  SearchResult.value = []
  const result = await search({
  query: args,
  requestOptions: {
    page: page - 1,
  }
  // Search For Page 2
 })
console.log("Result Updated")
SearchCount.value = result.nbHits
 SearchResult.value = result.hits 
 SearchPages.value = result.nbPages

console.log(result)
 }
 searchAsync("三X")

</script>
<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col   class="d-none d-sm-none d-lg-block" xl="2" md="4">
          <v-card  rounded="lg">
            <template v-slot:title> 篩選 </template>
            <v-card-text>
              <span>類別</span>
              <v-select label="類別"></v-select>
              
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <v-text-field label="搜尋" variant="outlined" v-model="SearchArgs" placeholder="超大爆料中心" @update:modelValue="searchAsync">
            <template v-slot:append-inner   >
              <v-btn class="d-block d-sm-block d-md-none">Filter</v-btn>
            </template>
          </v-text-field>

          <v-sheet min-height="70vh" rounded="lg" >
            <v-row>
              <v-col>
                <v-card-title>
                  <span>搜尋結果</span>
                  <span class="font-weight-light">({{ SearchCount }})</span>
                </v-card-title>
              </v-col>
              </v-row>
              <div style="padding: 15px;"> 
            <div v-for="post in SearchResult" >
                  <v-lazy transition="">
                    <v-card
                      variant="tonal"
                      class="mx-auto"
                      :subtitle="post.type"
                      style="margin-bottom: 5px"
                      nuxt
                      :to="`view?id=${post.id}`"
                     >
                      <template v-slot:title>
                        <span class="font-weight-black">{{
                          post.content.split("，")[0]
                        }}</span>
                      </template>

                      <v-card-text>
                        {{ post.content.slice(0,150) }}
                      </v-card-text>
                    </v-card>
                  </v-lazy>
                </div></div>
                <v-pagination
              v-model="CurrentPage"
             @update:modelValue="searchAsync(SearchArgs,CurrentPage)"
               :length="SearchPages"
              class="my-4"
            ></v-pagination>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
