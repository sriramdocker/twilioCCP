import React, { useEffect, useRef, useState } from "react"
import TwilioVideo from "twilio-video"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "../components/start-form"

const Video = ({ token }) => {
  const localVidRef = useRef()
  const remoteVidRef = useRef()

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
          console.log("This is local host!")
                          })

        const addParticipant = participant => {
          console.log("new participant!")
          console.log(participant)
      
          console.log(participant.identity)
        
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track
              console.log("new participant123!")
              remoteVidRef.current.appendChild(track.attach())
              console.log("attached to remote video")
            }
          })

          participant.on("trackSubscribed", track => {
            console.log("track subscribed")
            remoteVidRef.current.appendChild(track.attach())
          })
        }

        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
        console.log(participant.identity + ' has connected');
      }
    )
  }, [token])

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    
        </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="Home" />
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
      <p>
        TODO: 1. Show local video 2. Connect to a room 3. Show participants’
        video (remote) 4. Handle events
        </p>
    </Layout>
  )
}

export default IndexPage
