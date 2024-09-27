export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const value = await fetch("https://api.cbdc.bio/v1/post/" + query.id);
  const json = await value.json();
  console.log(json);
  if(!json.posts){
    throw createError({
        statusCode: 404,
        statusMessage: 'Post Not Found Or Other Issues',
      })
  }
  return {
    post: json.posts["1"].post
  }
});
