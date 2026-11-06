# Ashby React Exercise

Welcome to the Ashby React exercise.

Instructions for what we want you to do will be sent to you as a PDF.

The rest of this README is dedicated to helping you get up and running and
understand what this code is.

This repo is a copy of the Ashby website repository from May 2023. It has been
stripped down to remove most files that aren't relevant to the exercise.

The website uses NextJS and Netlify CMS (and adapted
from [this template](https://github.com/wutali/nextjs-netlify-blog-template)).

## Local Development

We use Node 24 for local development. If you don't have this locally then
we recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your node versions.

We also use yarn to manage dependencies which can be installed with
`npm install --global yarn`.

You can also dependencies with `yarn install`.

A development server with live reload can be run with: `yarn run dev`.

The server should now be running on port 3010. As the repo has been stripped
down only the index page will work and all links will be broken. You can
access the index page at http://localhost:3010/.

Changes to content and code should automatically refresh the page and display
those changes.
