import React from 'react'

const Noteitem = (props) => {
    const { notes } = props;
    return (
        <div className="col-md-4 my-2">
        <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text">{notes.description}</p>
            </div>
        </div>
        </div>
    )
}

export default Noteitem
