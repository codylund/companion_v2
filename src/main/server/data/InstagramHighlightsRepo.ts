import { InstagramHighlight } from '../../shared/model/instagram/InstagramHighlight';

var highlights: InstagramHighlight[] = [];

export function updateHighlights(latest: InstagramHighlight[]) {
    highlights = latest;   
    console.log(highlights);
}

export function getLatestHighlight() {
    return highlights[0];
}

export function getHighlights() {
    return highlights;
}