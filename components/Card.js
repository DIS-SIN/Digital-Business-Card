import Link from 'next/link';
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import css from 'styled-jsx/css'
import SocialChannels from "./SocialChannels";

const Card = (props) => {

    return (
        <div className="card">
            <img className="avatar" src={props.card.avatar} alt={`${props.card.name}'s avatar`}/>
            <div className="cardContent">
                <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                    <p className="name">{props.card.name}</p>
                </Link>
                <p className="title">{props.card.title}</p>
                <p className="location">{props.card.fields.XfMG4K444A ? props.card.fields.XfMG4K444A.value : undefined}</p>
            </div>
            <div className="socialIcons">
                <a href={`mailto:${props.card.email}`} title={`Email ${props.card.email}`} target="_blank">
                    <IcomoonReact iconSet={iconSet} color="#444" size={20} icon="email"/>
                </a>
                {props.card.phone ?
                    <a href={`tel:${props.card.phone}`} title={`Call ${props.card.phone}`} target="_blank">
                        <IcomoonReact iconSet={iconSet} color="#444" size={20} icon="phone"/>
                    </a>    
                : undefined}
                <SocialChannels fields={props.fields} card={props.card}/>
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
    border: solid black 2px;
    margin: 5px;
    border-radius: 6px;
}

.avatar {
    max-width: 200px;
    object-fit: contain;
    overflow: hidden;
    z-index: -1;
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
    box-sizing: border-box;
}

.name {
    font-size: 17px;
    font-weight: bold;
    margin: 0;
    padding-bottom: 6px;
}

.title {
    font-size: 15px;
    margin: 0;
}

.location {
    font-size: 14px;
    color: #2f2f2f;
    margin: 0;
    padding-top: 5px;
}

.socialIcons {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    padding: 10px;
    border-top: solid black 1px;
    box-sizing: border-box;
    background-color: #f3f3f3;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

@media only screen and (max-width: 600px) {
    .card {
        width: 90%;
    }
}
`;

export default Card;