export function loadTweets(callback) {
  const xhr = new XMLHttpRequest()
  const method = 'GET' // "POST"
  const url = "http://127.0.0.1:8001/api/tweets/"
  const responseType = "json"
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function () {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function () {
    callback({"message": "The request was an error"}, 400)
  }
  xhr.send()
}