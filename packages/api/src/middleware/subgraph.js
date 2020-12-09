/**
 * Injects getOrchestrators() using a subgraph
 */

import fetch from 'isomorphic-fetch'

export default function subgraphMiddleware({ subgraphUrl }) {
  const blockList = {
    '0x3e2b450c0c499d8301146367680e067cd009db93': true,
  }

  const getOrchestrators = async () => {
    const query = `
      {
        transcoders(where: { active: true }) {
          id
          serviceURI
        }
      }
    `

    const res = await fetch(subgraphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const ret = []
    try {
      const transcoders = (await res.json()).data.transcoders
      for (const tr of transcoders) {
        if (tr.id.toLowerCase() in blockList) {
          continue
        }

        ret.push({
          address: tr.serviceURI,
        })
      }
    } catch (e) {
      console.error(e)
    }

    return ret
  }

  return (req, res, next) => {
    if (subgraphUrl) {
      req.getOrchestrators = getOrchestrators
    }

    return next()
  }
}
