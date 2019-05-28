export function fetchPopularRepos (language){
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  )
  
  // Try and get data from github and throw an error if we can't
  // or if we don't get any data.
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message)
      }
      return data.items
    })
}