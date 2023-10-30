import React from "react"
import { hydrateRoot } from "react-dom/client"
import RSC from './src/components/SyncRSC'

const searchParams = new URLSearchParams(location.search)
const breed = searchParams.get("breed")

const root = hydrateRoot(document,
  <RSC />
)