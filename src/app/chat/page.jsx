import { ChatWrapper } from '@/components/shared/Chat';

export const metadata = {
   title: 'Chat - Asistente de compras',
   description: 'Habla con nuestro asistente de compras para resolver tus dudas sobre productos.',
};

export default function ChatPage() {
   return (
      <main>
         <ChatWrapper />
      </main>
   );
}
