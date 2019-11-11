import { IgApiClient } from 'instagram-private-api';
import { InstagramMediaType } from '../../shared/model/instagram/InstramMediaType';
import { InstagramMedia } from '../../shared/model/instagram/InstagramMedia';
import { updateHighlights } from '../data/InstagramHighlightsRepo'
import { InstagramHighlight } from '../../shared/model/instagram/InstagramHighlight';

let inquirer = require('inquirer');

export function pullInstagramHighlights(username: string) {
    initIg().then(ig => {
        // Search for user.
        ig.user.searchExact(username)
            // Get their highlights tray.
            .then(user => ig.highlights.highlightsTray(user.pk))
            .then(highlightsTray => {
                var promises = highlightsTray.tray.map(highlight =>
                    // Get all the media for each highlight.
                    ig.feed.reelsMedia({
                        userIds: [highlight.id],
                    }).items().then(items => 
                        items.map(item => {
                            var url: string;
                            
                            switch(item.media_type) {
                                case InstagramMediaType.Photo: // photo
                                    url = item.image_versions2.candidates.shift().url;
                                    break;
                                case InstagramMediaType.Video: // video
                                    url = item.video_versions.shift().url;
                                    break;
                            }
                            
                            return {
                                type: item.media_type,
                                url: url,
                                time: 0
                            } as InstagramMedia;
                        })
                    ).then(items => {
                        return {
                            id: highlight.id,
                            title: highlight.title,
                            medias: items
                        } as InstagramHighlight;
                    })
                )
                // Combine all the promises.
                return Promise.all(promises);
            }).then(highlights => {
                // Publish the updated highlights.
                updateHighlights(highlights);
            })
    })
}

async function initIg() {
    const ig = new IgApiClient();
    ig.state.generateDevice('querycody');
    
    await ig.account.login('querycody', 'poopybutt69').catch(async () => {
        await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
        const { code } = await inquirer.prompt([
          {
            type: 'input',
            name: 'code',
            message: 'Enter code',
          },
        ]);
        await ig.challenge.sendSecurityCode(code);
      });

    return ig;
}
