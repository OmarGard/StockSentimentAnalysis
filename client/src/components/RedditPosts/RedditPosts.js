import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { ArrowForward } from '@mui/icons-material'; // Importación del ícono
import { useSelector } from 'react-redux';
import './RedditPosts.css'; // Importación del archivo CSS

function RedditPosts() {
  const data = useSelector((state) => state.app.data);

  if (!data) return null;

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Negative':
        return 'red';
      case 'Mixed':
        return 'yellow';
      case 'Positive':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className='reddit-posts'>
      <Typography variant="h5" gutterBottom>Reddit Posts</Typography>
      <List style={{ height: '100%'}}>
        {
          data.reddit.map((post, i) => (
            <ListItem key={i}>
                <div className="sentiment-rect" 
                  style={{ 
                    backgroundColor: getSentimentColor(post.sentiment), 
                  }}>
                </div>
                <ListItemText 
                  primary={
                    <div>
                      {post.title} (Score: {post.score}, Comments: {post.comments}) 
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="reddit-link-icon">
                        <ArrowForward fontSize="small" />
                      </a>
                    </div>
                  } 
                  secondary={
                    <span title={post.text}>
                      {`${post.text.slice(0, 150)}...`}
                    </span>
                  }
                />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

export default RedditPosts;
