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
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  if (action.type === 'like') {
    return <button className={className}>
      {tweet.likes} Likes
    </button>
  } else {
    return null;
  }
}

export function Tweet(props) {
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