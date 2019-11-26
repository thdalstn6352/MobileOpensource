declare module "cordova-background-geolocation-lt" {
  /**
  * The event-object provided to [[BackgroundGeolocation.onHttp]] when an HTTP response arrives from your configured [[Config.url]].
  *
  * @example
  * ```typescript
  * BackgroundGeolocation.onHttp(httpEvent => {
  *   console.log('[http] ', httpEvent.success, httpEvent.status);
  * });
  * ```
  *
  * ## HTTP Guide
  * ---------------------------------------------------------------------------------------
  *
  * The [[BackgroundGeolocation]] SDK hosts its own flexible and robust native HTTP & SQLite persistence services.  To enable the HTTP service, simply configure the SDK with an [[url]]:
  *
  * @example
  * ```typescript
  * // Listen for HTTP responses.
  * BackgroundGeolocation.onHttp(response => {
  *   console.log('[http] response: ', response.success, response.status, response.responseText);
  * });
  *
  * BackgroundGeolocation.ready({
  *   url: 'https://my-server.com/locations',
  *   autoSync: true,
  *   autoSyncThreshold: 5,
  *   batchSync: true,
  *   maxBatchSize: 50,
  *   headers: {
  *     AUTHENTICATION_TOKEN: "23kasdlfkjlksjflkasdZIds"
  *   },
  *   params: {
  *     user_id: 1234
  *   },
  *   extras: {
  *     route_id: 8675309
  *   },
  *   locationsOrderDirection: 'DESC',
  *   maxDaysToPersist: 14
  * }, state => {
  *   console.log('[ready] success: ', state);
  * });
  * ```
  *
  * ### The SQLite Database
  *
  * The SDK immediately inserts each recorded location into its SQLite database.  This database is designed to act as a temporary buffer for the HTTP service and the SDK __strongly__ desires an *empty* database.  The only way that locations are destroyed from the database are:
  * - Successful HTTP response from your server (`200`, `201`, `204`).
  * - Executing [[BackgroundGeolocation.destroyLocations]].
  * - [[maxDaysToPersist]] elapses and the location is destroyed.
  * - [[maxRecordsToPersist]] destroys oldest record in favor of latest.
  *
  * ### The HTTP Service
  *
  * The SDK's HTTP service operates by selecting records from the database, locking them to prevent duplicate requests then uploading to your server.
  * - By default, the HTTP Service will select a single record (oldest first; see [[locationsOrderDirection]]) and execute an HTTP request to your [[url]].
  * - Each HTTP request is *synchronous* &mdash; the HTTP service will await the response from your server before selecting and uploading another record.
  * - If your server returns an error or doesn't respond, the HTTP Service will immediately **halt**.
  * - Configuring [[batchSync]] __`true`__ instructs the HTTP Service to select *all* records in the database and upload them to your server in a single HTTP request.
  * - Use [[maxBatchSize]] to limit the number of records selected for each [[batchSync]] request.  The HTTP service will execute *synchronous* HTTP *batch* requests until the database is empty.
  *
  * ### HTTP Failures
  *
  * If your server does *not* return a `20x` response (eg: `200`, `201`, `204`), the SDK will __`UNLOCK`__ that record.  Another attempt to upload will be made in the future (until [[maxDaysToPersist]]) when:
  * - When another location is recorded.
  * - Application `pause` / `resume` events.
  * - Application boot.
  * - [[onHeartbeat]] events.
  * - [[onConnectivityChange]] events.
  * - __[iOS]__ Background `fetch` events.
  *
  * ### Receiving the HTTP Response.
  *
  * You can capture the HTTP response from your server by listening to the [[onHttp]] event.
  *
  * ### [[autoSync]]
  *
  * By default, the SDK will attempt to immediately upload each recorded location to your configured [[url]].
  * - Use [[autoSyncThreshold]] to throttle HTTP requests.  This will instruct the SDK to accumulate that number of records in the database before calling upon the HTTP Service.  This is a good way to **conserve battery**, since HTTP requests consume more energy/second than the GPS.
  *
  * ### Manual [[sync]]
  *
  * The SDK's HTTP Service can be summoned into action at __any time__ via the method [[BackgroundGeolocation.sync]].
  *
  * ### [[params]], [[headers]] and [[extras]]
  *
  * - The SDK's HTTP Service appends configured [[params]] to root of the `JSON` data of each HTTP request.
  * - [[headers]] are appended to each HTTP Request.
  * - [[extras]] are appended to each recorded location and persisted to the database record.
  *
  * ### Custom `JSON` Schema:  [[locationTemplate]] and [[geofenceTemplate]]
  *
  * The default HTTP `JSON` schema for both [[Location]] and [[Geofence]] can be overridden by the configuration options [[locationTemplate]] and [[geofenceTemplate]], allowing you to create any schema you wish.
  *
  * ### HTTP Logging
  *
  * You can observe the plugin performing HTTP requests in the logs for both iOS and Android (_See Wiki [Debugging](github:wiki/Debugging)_):
  *
  * @example
  * ```
  * ╔═════════════════════════════════════════════
  * ║ LocationService: location
  * ╠═════════════════════════════════════════════
  * ╟─ 📍 Location[45.519199,-73.617054]
  * ✅ INSERT: 70727f8b-df7d-48d0-acbd-15f10cacdf33
  * ╔═════════════════════════════════════════════
  * ║ HTTP Service
  * ╠═════════════════════════════════════════════
  * ✅ Locked 1 records
  * 🔵 HTTP POST: 70727f8b-df7d-48d0-acbd-15f10cacdf33
  * 🔵 Response: 200
  * ✅ DESTROY: 70727f8b-df7d-48d0-acbd-15f10cacdf33
  * ```
  *
  * |#| Log entry               | Description                                                           |
  * |-|-------------------------|-----------------------------------------------------------------------|
  * |1| `📍Location`            | Location received from native Location API.                           |
  * |2| `✅INSERT`              | Location record inserted into SDK's SQLite database.                  |
  * |3| `✅Locked`              | SDK's HTTP service locks a record (to prevent duplicate HTTP uploads).|
  * |4| `🔵HTTP POST`           | SDK's HTTP service attempts an HTTP request to your configured `url`. |
  * |5| `🔵Response`            | Response from your server.                                            |
  * |6| `✅DESTROY\|UNLOCK`     | After your server returns a __`20x`__ response, the SDK deletes that record from the database.  Otherwise, the SDK will __`UNLOCK`__ that record and try again in the future. |
  *
  */
  interface HttpEvent {
    /**
    * True if the HTTP request was successful (eg: `200`, `201`, `204`).
    */
    success: boolean;
    /**
    * HTTP status code (eg: `200`, `500`, `404`).
    */
    status: number;
    /**
    * HTTP response text provided by the server.
    */
    responseText: string;
  }
}
