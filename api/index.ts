import { NowRequest, NowResponse } from '@vercel/node'
import * as requestIp from 'request-ip'

export default async (req: NowRequest, res: NowResponse) => {
  const ip = requestIp.getClientIp(req)
  const { query } = req

  // Set response status right away.
  res.status(200)

  // Handle response formats
  if (query.f === 'text') return res.send(ip)

  if (query.f === 'xml') {
    res.setHeader('Content-Type', 'text/xml')

    return res.send(`<?xml version="1.0" encoding="UTF-8"?><ip>${ip}</ip>`)
  }

  return res.json({ ip })
}