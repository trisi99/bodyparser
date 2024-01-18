const Card = ({entry, deleteEntry}) => {
    return ( 
        <div>
            <p>Name:</p><p>{entry.firstname} {entry.lastname}</p>
            <p>{entry.mail}</p>
            <p>schreibt:</p>
            <p>{entry.message}</p>
            <button onClick={deleteEntry}>Delete</button>
        </div>
     );
}
 
export default Card;