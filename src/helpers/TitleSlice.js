export default function TitleSlice(title) {

    return title.length > 7 ? title.slice(0, 7) + "..." : title;


}