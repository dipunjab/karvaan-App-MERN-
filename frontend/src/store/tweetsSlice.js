import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [
      {
        id: "1",
        username: "CodeMaster",
        userpfp: "https://randomuser.me/api/portraits/men/1.jpg",
        content: "Just finished an awesome JavaScript project! 🚀 #coding",
        createdAt: "2025-01-28",
        likedBy: false,
        totalLikes: 12,
        totalSubscribed: true,
        totalSubscribers: 1500,
        comments: [
          {
            id: "c1",
            username: "ReactGuru",
            userpfp: "https://randomuser.me/api/portraits/women/2.jpg",
            content: "Nice work! What's the project about?",
            createdAt: "2025-01-28",
            likedBy: true,
            totalLikes: 3,
          },
          {
            id: "c1",
            username: "ReactGuru",
            userpfp: "https://randomuser.me/api/portraits/women/2.jpg",
            content: "Nice work! What's the project about?",
            createdAt: "2025-01-28",
            likedBy: true,
            totalLikes: 3,
          },
          {
            id: "c1",
            username: "ReactGuru",
            userpfp: "https://randomuser.me/api/portraits/women/2.jpg",
            content: "Nice work! What's the project about?",
            createdAt: "2025-01-28",
            likedBy: true,
            totalLikes: 3,
          },
          {
            id: "c1",
            username: "ReactGuru",
            userpfp: "https://randomuser.me/api/portraits/women/2.jpg",
            content: "Nice work! What's the project about?",
            createdAt: "2025-01-28",
            likedBy: true,
            totalLikes: 3,
          },
          {
            id: "c2",
            username: "DevOpsExpert",
            userpfp: "https://randomuser.me/api/portraits/men/3.jpg",
            content: "JavaScript is 🔥! Keep going!",
            createdAt: "2025-01-28",
            likedBy: false,
            totalLikes: 1,
          },
        ],
      },
      {
        id: "2",
        username: "BackendDev",
        userpfp: "https://randomuser.me/api/portraits/men/4.jpg",
        content: "Node.js and Express make backend development so much easier! 💻",
        createdAt: "2025-01-27",
        likedBy: true,
        totalLikes: 22,
        totalSubscribed: false,
        totalSubscribers: 2000,
        comments: [
          {
            id: "c3",
            username: "APIMaster",
            userpfp: "https://randomuser.me/api/portraits/women/5.jpg",
            content: "I love working with Express!",
            createdAt: "2025-01-27",
            likedBy: true,
            totalLikes: 4,
          },
        ],
      },
      {
        id: "3",
        username: "TypeScriptNinja",
        userpfp: "https://randomuser.me/api/portraits/men/6.jpg",
        content: "TypeScript is a game changer for large-scale applications! 🔥",
        createdAt: "2025-01-26",
        likedBy: false,
        totalLikes: 18,
        totalSubscribed: true,
        totalSubscribers: 1700,
        comments: [
          {
            id: "c4",
            username: "CodeMaster",
            userpfp: "https://randomuser.me/api/portraits/men/1.jpg",
            content: "Totally agree! Type safety saves so much debugging time.",
            createdAt: "2025-01-26",
            likedBy: true,
            totalLikes: 5,
          },
        ],
      },
      {
        id: "4",
        username: "DataScientist",
        userpfp: "https://randomuser.me/api/portraits/women/7.jpg",
        content: "Python is still my go-to language for data science! 📊",
        createdAt: "2025-01-25",
        likedBy: true,
        totalLikes: 30,
        totalSubscribed: false,
        totalSubscribers: 2500,
        comments: [
          {
            id: "c5",
            username: "MLGuru",
            userpfp: "https://randomuser.me/api/portraits/men/8.jpg",
            content: "Pandas and NumPy are life savers!",
            createdAt: "2025-01-25",
            likedBy: true,
            totalLikes: 7,
          },
        ],
      },
      {
        id: "5",
        username: "DevOpsExpert",
        userpfp: "https://randomuser.me/api/portraits/men/9.jpg",
        content: "Docker and Kubernetes make deployment a breeze! 🐳",
        createdAt: "2025-01-24",
        likedBy: false,
        totalLikes: 15,
        totalSubscribed: true,
        totalSubscribers: 1800,
        comments: [
          {
            id: "c6",
            username: "CloudEngineer",
            userpfp: "https://randomuser.me/api/portraits/women/10.jpg",
            content: "Cloud + Containers = Best combo!",
            createdAt: "2025-01-24",
            likedBy: false,
            totalLikes: 2,
          },
        ],
      },
    ],
  };
  

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const { tweetId, commentId } = action.payload;

      if (commentId) {
        const tweet = state.tweets.find((t) => t.id === tweetId);
        if (tweet) {
          const comment = tweet.comments.find((c) => c.id === commentId);
          if (comment) {
            comment.likedBy = !comment.likedBy;
            comment.likedBy ? comment.totalLikes++ : comment.totalLikes--;
          }
        }
      } else {
        // Toggle like for a tweet
        const tweet = state.tweets.find((t) => t.id === tweetId);
        if (tweet) {
          tweet.likedBy = !tweet.likedBy;
          tweet.likedBy ? tweet.totalLikes++ : tweet.totalLikes--;
        }
      }
    },
  },
});

export const { toggleLike } = tweetSlice.actions;

export default tweetSlice.reducer;
