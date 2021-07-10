import React, {useEffect, useState} from 'react'
import {loadTweets} from "../lookup";

export function TweetsList(props) {
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
    <div>
      {tweets.map((item, index) => {
        return <Tweet tweet={item} key={`${index}-${item.id}`}
                      className='my-5 py-5 border bg-white text-dark'/>
      })}
    </div>
  )
}

export function ActionBtn(props) {
  const {tweet, action} = props;
  let [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [userLike, setUserLike] = useState(tweet.userLike);
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  let display = action.display ? action.display : 'Action';
  const handleClick = (e) => {
    e.preventDefault();
    switch (action.type) {
      case 'like':
        if (userLike) {
          setUserLike(false)
          setLikes(likes-1)
        } else {
          setUserLike(true)
          setLikes(likes+1)
        }
        break;
    }
  }

  switch (action.type) {
    case 'like':
      display = `${likes} ${action.display}`
      break;
  }
  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  )
}

export function Tweet(props) {
  const {tweet} = props;
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
  return (
    <div className={className}>
      <p>{tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: 'like', display: "Likes"}}/>
        <ActionBtn tweet={tweet} action={{type: 'unlike', display: "Unlike"}}/>
        <ActionBtn tweet={tweet} action={{type: 'retweet', display: "Retweet"}}/>
      </div>
    </div>
  )
}