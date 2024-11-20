// PlayerContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Player: (options: any) => any;
      Spotify: any;
    }
}

interface Spotify {
  Track: {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
}

interface PlayerContextProps {
  player: Window['Spotify']['Player'] | null;
  device_id: string | null;
  isPlaying: boolean;
  isInitializing: boolean;
  currentTrack: Spotify['Track'] | null;
  currentPosition: number;
  duration: number;
  playSong: (uri: string) => void;
  pauseSong: () => void;
  skipSong: () => void;
  previousSong: () => void;
  resumeSong: () => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const [player, setPlayer] = useState<Window['Spotify']['Player'] | null>(null);
  const [device_id, setDeviceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<Spotify['Track'] | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const initializePlayer = useCallback(async () => {
    if (!token) {
      console.error('Access token not available');
      return;
    }

    try {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      await new Promise<void>((resolve) => {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      });

      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: (token: string) => void) => {
          if (token) {
            cb(token);
          }
        },
        volume: 0.5
      });

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id);
        window.sessionStorage.setItem("device_id", device_id);
        setIsInitializing(false);
      });

      player.addListener('player_state_changed', (state: any) => {
        if (state) {
          setIsPlaying(!state.paused);
          setCurrentTrack(state.track_window.current_track);
          setCurrentPosition(state.position);
          setDuration(state.duration);
          console.log(state.position);
        }
      });

      await player.connect();
      setPlayer(player);
    } catch (error) {
      console.error('Error initializing player:', error);
      setIsInitializing(false);
    }
  }, [token]);

  useEffect(() => {
    if (token && !player) {
      initializePlayer();
    }
  }, [token, player, initializePlayer]);

  const playSong = async (uri: string) => {
    if (!player || !device_id) {
      console.error('Player or device_id not initialized');
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          uris: [uri]
        })
      });
    } catch (error) {
      console.error('Error during playback:', error);
    }
  };

  const pauseSong = async () => {
    if (!player || !device_id) {
      console.error('Player or device_id not initialized');
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setIsPlaying(false);
    } catch (error) {
      console.error('Error during pause:', error);
    }
  };

  const skipSong = async () => {
    if (!player || !device_id) {
      console.error('Player or device_id not initialized');
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${device_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error during skip:', error);
    }
  };

  const previousSong = async () => {
    if (!player || !device_id) {
      console.error('Player or device_id not initialized');
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${device_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error during previous track:', error);
    }
  };

  const resumeSong = async () => {
    if (!player || !device_id) {
      console.error('Player or device_id not initialized');
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error during resume:', error);
    }
  };

  return (
    <PlayerContext.Provider value={{ player, device_id, isPlaying, isInitializing, currentTrack, currentPosition, duration, playSong, pauseSong, skipSong, previousSong, resumeSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};