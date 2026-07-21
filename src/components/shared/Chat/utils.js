import Link from 'next/link';

function escapeHtml(text) {
   return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

export function parseMarkdown(text) {
   if (!text) return null;

   const tokens = [];
   let remaining = text;

   const patterns = [
      { type: 'link', regex: /\[([^\]]+)\]\(\s*\/?product\/([^)\s]+)\s*\)/ },
      { type: 'bold', regex: /\*\*([^*]+)\*\*/ },
      { type: 'italic', regex: /(?<!\*)\*([^*]+)\*(?!\*)/ },
      { type: 'code', regex: /`([^`]+)`/ },
   ];

   let key = 0;

   while (remaining.length > 0) {
      let earliest = null;
      let earliestIndex = Infinity;

      for (const { type, regex } of patterns) {
         const match = remaining.match(regex);
         if (match && match.index < earliestIndex) {
            earliest = { type, match };
            earliestIndex = match.index;
         }
      }

      if (!earliest) {
         tokens.push(<span key={key++}>{escapeHtml(remaining)}</span>);
         break;
      }

      const { type, match } = earliest;

      if (match.index > 0) {
         tokens.push(<span key={key++}>{escapeHtml(remaining.slice(0, match.index))}</span>);
      }

      if (type === 'link') {
         tokens.push(
            <Link key={key++} href={`/product/${match[2]}`}>{match[1]}</Link>
         );
      } else if (type === 'bold') {
         tokens.push(<strong key={key++}>{match[1]}</strong>);
      } else if (type === 'italic') {
         tokens.push(<em key={key++}>{match[1]}</em>);
      } else if (type === 'code') {
         tokens.push(<code key={key++}>{match[1]}</code>);
      }

      remaining = remaining.slice(match.index + match[0].length);
   }

   return tokens;
}
