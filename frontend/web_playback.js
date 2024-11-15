const token = localStorage.getItem('SPOTIFY_TOKEN');
let deviceId = '';
document.defaultView.onSpotifyWebPlaybackSDKReady = function(){
	clearTimeout(window.checkSpotifyPlayerStatusTimeout)
	console.log(`onSpotifyWebPlaybackSDKReady token: ${token}`);
	TextLog(`onSpotifyWebPlaybackSDKReady`)
	let device = cuppa.browser();
	let name = `CloudBit ${device.browser} ${device.os}`
	TextLog(`Device Name [${name}]`)
	const player = new Spotify.Player({
		name: name,
		getOAuthToken: cb => { cb(`${token}`); },
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		deviceId = device_id;
		console.log('Ready with Device ID', device_id);
		TextLog(`Ready with Device ID: ${device_id}`);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
		TextLog(`Device ID has gone offline: ${device_id}`);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.log('initialization_error', message);
		TextLog("initialization_error");
	});

	player.addListener('authentication_error', ({ message }) => {
		console.log('authentication_error', message);
		TextLog("authentication_error");
	});

	player.addListener('account_error', ({ message }) => {
		console.log(message);
		TextLog("account_error");
	});

	player.addListener('ready', ({ device_id }) => {
		console.log('The Web Playback SDK is ready to play music!');
		console.log('Device ID', device_id);
		TextLog(`ready ${device_id}`);
	})

	player.addListener('autoplay_failed', () => {
		TextLog('Autoplay is not allowed by the browser autoplay rules');
	});

	player.addListener('player_state_changed', ({position, duration, track_window: { current_track }}) => {
		TextLog('current_track');
		TextLog('Position in Song', position);
		TextLog('Duration of Song', duration);
	});


	player.connect().then(success => {
		if (success) {
			console.log('The Web Playback SDK successfully connected to Spotify!');
			TextLog(`The Web Playback SDK successfully connected to Spotify!`);
		}
	}).catch(error=>{
		console.log("player.connect() FAILED with error: " + error)
		TextLog(`player.connect() FAILED with error`);
	})
	player.activateElement().then();
	window.player = player;
}

// Play selected song
const play_song = async (uri) => {
	player.activateElement();
	let browser = cuppa.browser();
	TextLog(browser);
	console.log("Changing song", uri);
	TextLog(`Changing song ${uri}`);
	TextLog(`Device ID ${deviceId}`);
	TextLog(`activateElement`);
	await player.activateElement();
	await player.setVolume(0.5);
	let headers = new Headers({Authorization: "Bearer " + token,});
	let device = document.getElementById('device').value || deviceId;
	let url = `https://api.spotify.com/v1/me/player/play/?device_id=${device}`;
	let body = {uris:[uri]}
	TextLog(`URL2: ${url}`)
	let result = await fetch(url, {method: "PUT", body: JSON.stringify(body), headers});
	player.seek(0);
	player.resume();

	/*
	await cuppa.wait(1000);
	try{
		let url = `https://api.spotify.com/v1/me/player`;
		let playerState = await fetch(url, {method:"GET", headers});
		playerState = await playerState.json();
		TextLog("Sound Status: ", playerState?.is_playing)
		if(!playerState?.is_playing){
			player.togglePlay();
			player.seek(0);
			player.resume();
		}
	}catch(err){ }

	 */
};

