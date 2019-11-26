declare module "cordova-background-geolocation-lt" {
	/**
	* The event-object provided to [[BackgroundGeolocation.onConnectivityChange]]
	*
	* @example
	* ```typescript
	* BackgroundGeolocation.onConnectivityChange(connectivityChangeEvent => {
	*   console.log('[connectivitychange] ', connectivityChangeEvent.connected);
	* });
	* ```
	*/
	interface ConnectivityChangeEvent {
	  /**
	  * `true` when the device has access to a network connection.
	  */
	  connected: boolean;
	}
}
