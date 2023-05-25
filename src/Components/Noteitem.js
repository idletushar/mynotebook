import React from 'react'

const Noteitem = (props) => {
    const { notes } = props;

    // props.showAlert('Note has been removed!', 'success')
    return (
        <div className="col-md-4 my-2">
        <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{notes.title}</h5>
                <i className="fa-solid fa-trash-can mx-2" style={{color: "#f20202"}}></i>
                <i className="fa-solid fa-file-pen mx-2" style={{color: "#0cb617"}}></i>
                </div>
                <p className="card-text">{notes.description}</p>
            </div>
        </div>
        </div>
    )
}

export default Noteitem
