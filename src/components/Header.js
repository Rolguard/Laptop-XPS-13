import PropTypes from 'prop-types'
import Button from './Button'

// Props are given to function/object, can use props or do {title} to destructure
const Header = ({title}) => {

    const onClick = () => {
        console.log("Clicked")
    }

    return (
        <header className='header'>
            {/* Can do in-line css in react components
            but project leads will kick you if you do... (MJ) 
            
            Notice how background-color from css gets turned into
            backgroundColor, keywords in JS such as class in html become className
            */}
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick}/>
        </header>
    )
}

// defaultProps for default value if no props given

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// Can ceate variable for css to use in js, only used for dynamic styling
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header