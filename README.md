# Companion v2
A reinvisioned [Companion]. Now enables providing more contextual information about an image(s) or a video.
It's essentially a blog, but I'd prefer not to call it that.

## Repo Map

### [`/designs`](/designs)

Contains Affinity Photo file(s) for custom-made icons, logos, etc.

### [`/server`](/server)

Handles HTTP requests for blog content. Also enables searching. Currently implemented as Firebase Functions.

**Technology**: Typescript-based NPM module.

### [`/shared`](/shared)

Shared models and logic consume by two or more modules.

**Technology**: Typescript-based NPM module.

### [`/web`](/web)

The front-end web client that queries the server for content and shows it to the user.

**Technology**: Angular.


<!-- Links -->
[Companion]: https://github.com/codylund/companion