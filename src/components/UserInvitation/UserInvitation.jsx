
const UserInvitation = () => {

    const onClickHandler = () => {
        console.log('clicked on generate token');
    }
    
    return (
        <div className="user-invitation-container">
            <h2>Want to invite someone to join your family?</h2>
            <br />
            click the button below to receive a unique registration link
            <br />
            <br />
            <button className="btn_save" onClick={onClickHandler}>Generate new family member link</button>
        </div>
    )

}

export default UserInvitation;