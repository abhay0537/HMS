import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomID } = useParams();
  const elementRef = useRef(null);
  const zpRef = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
      const appID = 1264575123;
      const serverSecret = "4559bb693893812b0672f409a014162d";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "patient"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      try {
        await zp.joinRoom({
          container: elementRef.current,
          sharedLinks: [
            {
              link: 'https://storage.zego.im/demo/whiteboard/index.html',
              renderType: 'whiteboard',
              config: {
                roomID,
                userID: 'patient',
                userName: 'patient',
                appID,
                appSign: serverSecret,
                isWritable: true,
                isManager: false,
              },
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      } catch (error) {
        console.error("Error joining the room:", error);
      }
    };

    initializeZego();
  }, [roomID]);

  return (
    <div ref={elementRef}>
      <h1>{roomID}</h1>
    </div>
  );
};

export default Room;
