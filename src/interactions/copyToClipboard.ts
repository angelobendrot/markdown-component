type ArgumentType = string;

function copyToClipboard({ event, argument }: { event: Event, argument: ArgumentType }): void {
  event.preventDefault();
  navigator.clipboard.writeText(argument)
}