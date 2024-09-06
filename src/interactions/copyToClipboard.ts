type ArgumentType = string;

function copyToClipboard({ event, argument }: { event: Event, argument: ArgumentType }): void {
  event.preventDefault();
  
  const blob = new Blob([argument], { type: 'text/html' });
  const clipboardItem = new ClipboardItem({ 'text/html': blob });

  navigator.clipboard.write([clipboardItem])
}