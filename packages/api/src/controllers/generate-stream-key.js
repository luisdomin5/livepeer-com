import { randomBytes } from 'crypto'
import anyBase from 'any-base'

const BASE_36 = '0123456789abcdefghijklmnopqrstuvwxyz'
const SEGMENT_COUNT = 4
const SEGMENT_LENGTH = 4
const hexToBase36 = anyBase(anyBase.HEX, BASE_36)

/**
 * Securely generate a stream key of a given length. Goals for stream keys: be reasonably secure
 * but also easy to type if necessary. Base36 facilitates this.
 *
 * Returns stream keys of the form XXXX-XXXX-XXXX in Base36. 62-ish bits of entropy.
 */
export async function generateStreamKey() {
  return new Promise((resolve, reject) => {
    randomBytes(128, (err, buf) => {
      if (err) {
        return reject(err)
      }
      const raw = hexToBase36(buf.toString('hex'))
      let result = ''
      const TOTAL_LENGTH = SEGMENT_COUNT * SEGMENT_LENGTH
      for (let i = 0; i < TOTAL_LENGTH; i += 1) {
        // Pull from the end of the raw string, the start has least siginificant bits
        // and isn't likely to be fully random.
        result += raw[raw.length - 1 - i]
        if ((i + 1) % SEGMENT_LENGTH === 0 && i < TOTAL_LENGTH - 1) {
          result += '-'
        }
      }
      resolve(result)
    })
  })
}

// Hidden functionality - run this file directly with `node -r esm generate-stream-key.js` to generate shard keys!
if (!module.parent) {
  if (process.argv[2]) {
    const shardCount = parseInt(process.argv[2])
    const shards = [...new Array(shardCount)].map(() => '')
    let remainingLetters = BASE_36.split('')
    let shardIdx = 0
    while (remainingLetters.length > 0) {
      shards[shardIdx] += remainingLetters.shift()
      shardIdx = (shardIdx + 1) % shardCount
    }
    for (const shard of shards) {
      console.log(shard)
    }
  } else {
    generateStreamKey().then((x) => console.log(x))
  }
}
