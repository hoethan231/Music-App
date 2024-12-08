# Welcome to GrooveBox!

GrooveBox is a cutting-edge music app that allows users to create and manage their own playlists, discover new music, and connect with friends who share similar tastes. Our app is designed to provide a seamless and enjoyable music experience!

## Getting Started

First, checkout [Spotify's documentation](https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started) to get your own spotify API key and add it to your .env file
```
NEXT_PUBLIC_ACCESS_TOKEN=YOUR_KEY
```


Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run with DockerFile

If you want to run without installing dependencies, try our dockerfile! Just make sure you have docker installed.
```
docker build -t GrooveBox .
docker run -p 3000:3000 GrooveBox
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

