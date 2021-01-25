import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge, FlexboxGrid, Tag, TagGroup } from 'rsuite';
import { Post } from '../../../core/models/Post.model';
import moment from 'moment';
import './PostSummary.css'

interface PostSummaryProps {
  post: Post;
}

export default ({ post }: PostSummaryProps) => {
  return (
    <FlexboxGrid style={{ paddingLeft: '20px' }}>
      <FlexboxGrid.Item
        colspan={2}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h5>{post.votes}</h5>
        <p>Votos</p>
        <h5>{post.comments}</h5>
        <p>Comentarios</p>
        <br></br>
        <p>Visto {post.viewed}</p>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={18} style={{ padding: '10px' }}>
        <Link to={'/app/posts/' + post._id}>
          <h5>{post.title}</h5>
        </Link>
        <br />
        <p dangerouslySetInnerHTML={{ __html: post.content}}></p>
        <br />
        <TagGroup>
          {post.tags.map((tag, index) => (
            <Tag key={index} color='blue'>{tag}</Tag>
          ))}
        </TagGroup>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        colspan={4}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Avatar src={post.owner?.profileImg} />

        <span>
          {post.owner?.name} - <Badge content={post.owner?.rating} />
        </span>
        <span>{moment(post.createdDate).fromNow()}</span>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
