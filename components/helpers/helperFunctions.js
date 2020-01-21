export function getSocialChannels(fields, card) {
    let socialChannels = [];
    fields.forEach(field => {
        if (card.fields[field.fieldID] && field.label != "Where I work"){
            socialChannels.push({
                label: field.label,
                value: card.fields[field.fieldID].value,
                alt: card.fields[field.fieldID].alt,
                icon: field.label === "Blog/Website" ? "website" : field.label.toLowerCase(),
                fieldID: field.fieldID
            });
        }
    });
    return socialChannels;
}

export function getVCard(card, fields) {

    let firstName = card.name.split(" ")[0];
    let lastName = card.name.split(" ").splice(1, card.name.split(" ").length).join(" ");

    let socials = "";
    fields.forEach(field => {
        if (field.icon != "website"){
            socials += `\nX-SOCIALPROFILE;type=${field.label}:${field.value}`;
        }
    });

    let website = fields.find(field => field.icon === "website");


    let vCard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${card.name}\nORG:Canadian School of Public Service;Digital Academy\nEMAIL;type=INTERNET;type=WORK;type=pref:${card.email}`;

    if (card.title){
        vCard += `\nTITLE:${card.title}`;
    }
    if (card.phone){
        vCard += `\nTEL;type=WORK;type=VOICE;type=pref:${card.phone}`;
    }
    if (socials != ""){
        vCard += socials;
    }
    if (website){
        vCard += `\nURL;type=HOME;type=pref:${website.value}`;
    }

    vCard += "\nEND:VCARD";

    return vCard;
}