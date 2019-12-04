let postScore = (name,scoreNum) => {
 
  const url = `http://localhost:3000/scores`
  return fetch(url, {
    method:'POST',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
    player_name: name,
    score: scoreNum
    })
  })
  .then(resp => resp.json())
}

const adaptor = {
    postScore
  }