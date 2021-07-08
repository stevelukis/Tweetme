import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function loadTweets(callback) {
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

function ActionBtn(props) {
  const {tweet, action} = props;
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  if (action.type === 'like') {
    return <button className={className}>
      {tweet.likes} Likes
    </button>
  } else {
    return null;
  }
}

function Tweet(props) {
  const {tweet} = props;
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
  return (
    <div className={className}>
      <p>{tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: 'like'}}/>
      </div>
    </div>
  )
}

function App() {
  const [tweets, setTweets] = useState([{content: 123}])

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweets(response)
      } else {

      }
    }
    loadTweets(myCallback)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((item, index) => {
            return <Tweet tweet={item} key={`${index}-${item.id}`}
                          className='my-5 py-5 border bg-white text-dark'/>
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
