import React from 'react';
import {List, Icon} from 'antd';

const FilmRow = ({item}) => {
    return (
        <List.Item
            key={item.title}
            actions={[
                <IconText type="star-o" text={item.voteAverage} key="list-vertical-star-o" />,
                <IconText type="like-o" text={item.voteCount} key="list-vertical-like-o" />
            ]}
            extra={
                <img
                    width={154}
                    alt="poster"
                    src={item.posterPath}
                />
            }
        >
            <List.Item.Meta
                title={item.title}
            />
            {item.overview}
        </List.Item>
    );
};

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);


export default FilmRow;