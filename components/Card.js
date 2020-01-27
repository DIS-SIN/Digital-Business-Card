import Link from 'next/link';
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import css from 'styled-jsx/css'
import {colours} from '../components/helpers/styleVariables';
import SocialChannels from "./SocialChannels";

const Card = (props) => {

    return (
        <div className="card">
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <img className="avatar" src={props.card.avatar} alt={`${props.card.name}'s avatar`}/>
            </Link>
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <div className="cardContent">
                    <p className="name cardText">{props.card.name}</p>
                    <p className="title cardText">{props.card.title}</p>
                    <p className="location cardText">{props.card.fields.XfMG4K444A ? props.card.fields.XfMG4K444A.value : undefined}</p>
                </div>
            </Link>
            <div className="socialIcons">
                <a href={`mailto:${props.card.email}`} title={`Email ${props.card.email}`} target="_blank">
                    <IcomoonReact iconSet={iconSet} color={colours.CSPS.purple} size={20} icon="email"/>
                </a>
                {props.card.phone ?
                    <a href={`tel:${props.card.phone}`} title={`Call ${props.card.phone}`} target="_blank">
                        <IcomoonReact iconSet={iconSet} color={colours.CSPS.purple} size={20} icon="phone"/>
                    </a>    
                : undefined}
                <SocialChannels fields={props.fields} card={props.card} colour={colours.CSPS.purple}/>
            </div>
            <style jsx>{styles}</style>
        </div>
    )
};

const styles = css`
.card {
    width: 200px;
    display: flex;
    flex-direction: column;
    border: solid ${colours.CSPS.purple} 2px;
    margin: 5px;
    border-radius: 6px;
}

.avatar {
    max-width: 200px;
    object-fit: contain;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.cardContent {
    min-height: 100px;
    flex 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 5px;
    background-color: white;
    box-sizing: border-box;
}

.cardText {
    margin: 0;
    color: black;
}

.name {
    font-size: 17px;
    font-weight: bold;
    padding-bottom: 6px;
}

.title {
    font-size: 15px;
}

.location {
    font-size: 14px;
    padding-top: 5px;
}

.socialIcons {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    padding: 10px;
    border-top: solid ${colours.CSPS.purple} 1px;
    box-sizing: border-box;
    background-color: ${colours.CSPS.mediumGrey};
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

@media only screen and (max-width: 600px) {
    .card {
        width: 80%;
    }

    .avatar {
        width: 100%;
        object-fit: fill;
        max-width: unset;
    }
}
`;

export default Card;