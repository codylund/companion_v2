'use strict';

const fs = require('fs');

const POSTS_DIR = 'src/assets/posts';
var filenames = fs.readdirSync(POSTS_DIR);

var metaJson = JSON.stringify(
    filenames
        .map(filename => {
            var bytes = fs.readFileSync(POSTS_DIR + '/' + filename);
            var json = JSON.parse(bytes);
            return {
                "id": json.id,
                "filename": filename,
                "tags": json.tags,
                "activityTypes": json.activityTypes
            };
        })
);

console.log(metaJson);