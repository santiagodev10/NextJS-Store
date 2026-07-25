'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('./Chat').then(mod => mod.Chat), {
   loading: () => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <p>Cargando chat...</p>
      </div>
   ),
   ssr: false,
});

export const ChatWrapper = () => {
   return <Chat />;
};
