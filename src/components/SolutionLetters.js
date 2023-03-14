// import '../styles/Letters.scss'

function Solution ({userLetters, word, renderSolutionLetters}){
    return(
        <div className='solution'>
            <h2 className='title'>Solución:</h2>
            <ul className='letters'>{renderSolutionLetters}</ul>
          </div>
    )
};

export default Solution;