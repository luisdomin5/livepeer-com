import TranscoderStatus from './TranscoderStatus'

const Transcoder = `

"Perform transcoding work for the network. The transcoders with the most delegated stake are elected as active transcoders that process transcode jobs for the network."
type Transcoder {

  "The transcoder's ETH address"
  id: String!

  "Whether or not the transcoder is active"
  active: Boolean!

  "The status of the transcoder"
  status: TranscoderStatus!

  "Last round that the transcoder called reward"
  lastRewardRound: String!

  "% of block reward cut paid to transcoder by a delegator"
  blockRewardCut: String!

  "% of fees paid to delegators by transcoder"
  feeShare: String!

  "Price per segment for a stream (LPTU)"
  pricePerSegment: String!

  "Pending block reward cut for next round if the transcoder is active"
  pendingBlockRewardCut: String!

  "Pending fee share for next round if the transcoder is active"
  pendingFeeShare: String!

  "Pending price per segment for next round if the transcoder is active"
  pendingPricePerSegment: String!

  # "Token pools for each round"
  # tokenPoolsPerRound: [TokenPool]

}`

export default () => [Transcoder, TranscoderStatus]
