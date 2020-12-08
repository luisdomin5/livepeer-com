import apiToken from './api-token'
import broadcaster from './broadcaster'
import ingest from './ingest'
import objectStore from './object-store'
import orchestrator from './orchestrator'
import stream from './stream'
import user from './user'
import geolocate from './geolocate'
import webhook from './webhook'
import region from './region'
import stripe from './stripe'
import version from './version'

// Annoying but necessary to get the routing correct
export default {
  'api-token': apiToken,
  broadcaster,
  'object-store': objectStore,
  orchestrator,
  stream,
  user,
  geolocate,
  ingest,
  webhook,
  region,
  stripe,
  version,
}
