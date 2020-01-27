import css from 'styled-jsx/css'
import {colours} from "../components/helpers/styleVariables";


const Header = () => (
    <div className="header">
        <h1>Digital Academy - l’Académie numérique</h1>
        <style jsx>{styles}</style>
    </div>
);

const styles = css`
.header {
    color: white;
    background-color: ${colours.CSPS.purple};
    padding: 20px;
}

@media only screen and (max-width: 600px) {
    
}
`;

export default Header;