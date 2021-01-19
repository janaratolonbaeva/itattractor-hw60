import React from 'react';
import './Send.css';

const Send = (props) => {
	return (
			<div className="Form mb-5">
				<label htmlFor="textarea" className="form-label mb-3">Write message</label>
				<textarea className="form-control mb-3" id="textarea" rows="3" value={props.message} onChange={props.messageWrite}/>
				<input type="text" className="form-control mb-3" placeholder="name" value={props.author} onChange={props.nameWrite}/>
				<button className="btn btn-primary mb-3" onClick={props.sendMessage}>Send</button>
			</div>
	);
};

export default Send;