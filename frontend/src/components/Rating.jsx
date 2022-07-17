import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

function Rating({ value, text }) {
  const fullStar = value.toString().split('.')[0]
  const digitAfterDecimal = value.toString().split('.')[1]

  return (
    <div className='rating'>
      <span style={{ color: '#ffc107' }}>
        {digitAfterDecimal ? (
          <>
            {Array.from({ length: fullStar }).map((_, i) => (
              <FaStar key={i} />
            ))}
            <FaStarHalfAlt />
            {Array.from({ length: 4 - fullStar }).map((_, i) => (
              <FaRegStar key={i} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: fullStar }).map((_, i) => (
              <FaStar key={i} />
            ))}
            {Array.from({ length: 5 - fullStar }).map((_, i) => (
              <FaRegStar key={i} />
            ))}
          </>
        )}
      </span>
      <span>{text}</span>
    </div>
  )
}
export default Rating
