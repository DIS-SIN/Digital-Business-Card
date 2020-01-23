import Link from 'next/link';
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import SocialChannels from "./SocialChannels";

const Card = (props) => {

    return (
        <div className="card">
            <img className="avatar" src={props.card.avatar} alt={`${props.card.name}'s avatar`}/>
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <p>{props.card.name}</p>
            </Link>
            <p>{props.card.title}</p>
            <p>{props.card.fields.XfMG4K444A ? props.card.fields.XfMG4K444A.value : undefined}</p>
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
            {styles()}
        </div>
    )
};

function styles() {
    return <style jsx>{`
        .card {
            width: 200px;
            display: flex;
            flex-direction: column;
            border: solid black 2px;
            margin: 5px;
        }
        
        .avatar {
            max-width: 200px;
            object-fit: contain;
        }
        
        .socialIcons {
            display: flex;
            justify-content: space-evenly;
            flex: 1;
            align-items: flex-end;
            padding: 10px;
        }
        
        @media only screen and (max-width: 600px) {
            .card {
                width: 90%;
            }
        }
    `}</style>
}

export default Card;