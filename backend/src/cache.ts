import NodeCache from 'node-cache';

// cache with 5 minute TTL (300 seconds)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60});

export default cache;