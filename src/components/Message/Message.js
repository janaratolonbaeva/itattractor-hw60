import React from 'react';

const Message = ({message, author, index}) => {
	return (
		<>
			<figure className="mt-3">
				<blockquote className="blockquote">
					<p>{message}</p>
				</blockquote>
				<figcaption className="blockquote-footer">{author}</figcaption>
			</figure>
			<hr/>
		</>
	);
};

export default Message;