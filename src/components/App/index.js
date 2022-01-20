import { useState, useEffect } from "react";

//styling
import "./App.css";

//components
import Form from "../Form";
import Feed from "../Feed";
import Navbar from "../Nav";



//declare vars
const API_URL = "https://code-review-soc-app.herokuapp.com";
let initialState = []
//Hook
function App() {
  const [posts, updatePosts] = useState(initialState);

  function handleNewPost(newPost) {
    const newArray = [...posts, newPost]
    updatePosts(newArray);
  }

  // Rendering a post upon inital load 
  
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

      });
      const data = await response.json();
      const postDetails = {
        post_id: data.payload[0].post_id,
        title: data.payload[0].title,
        username: data.payload[0].author_id,
        date: data.payload[0].date,
        code: data.payload[0].content,
        attempt: data.payload[0].attempted,
        describe: data.payload[0].problem
      }
      console.log(postDetails.post_id);
      const newArray = [...initialState, postDetails]
      updatePosts(newArray);
    }
    fetchPost();
  }, []);

  

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Form handleNewPost={handleNewPost}/>
        <Feed posts={posts} />
        </div>
    </div>
  );
}

export default App;
