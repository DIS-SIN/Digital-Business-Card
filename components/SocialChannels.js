import iconSet from "../icons/selection.json"
import IcomoonReact from "icomoon-react";
import {getSocialChannels} from "./helpers/helperFunctions"

const SocialChannels = (props) => (
        <React.Fragment>
            {getSocialChannels(props.fields, props.card).map(channel => (
                <a key={channel.fieldID} href={channel.value} title={channel.alt ? channel.alt : channel.label} target="_blank">
                    <IcomoonReact iconSet={iconSet} color={props.colour} size={20} icon={channel.icon}/>
                </a>
            ))}
        </React.Fragment>
);

export default SocialChannels;